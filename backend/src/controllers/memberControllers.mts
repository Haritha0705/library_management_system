import {Request,Response} from "express";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import memberModel from "../models/memberModel.mjs";

const registerMember = async (req: Request, res: Response):Promise<any> => {
    try {
        const {name,email,password} = req.body;

        //check in required value in here
        if (!name || !email || !password){
            return res.json({success:false,message:"Missing details!"}).status(400)
        }

        //email validate check
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email!"}).status(400)
        }

        //password is strong or not check
        if (password.length > 8){
            return res.json({success:false,message:"Enter valid password!"}).status(400)
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password,salt)

        const memberData = {
            name,
            email,
            password:hash_password
        }
        //save member data in db
        const newMember = new memberModel(memberData)
        const member = await newMember.save()

        const token = jwt.sign({id:member._id},process.env.JWT_SECRET as string)
        res.json({success:true,token}).status(201)

    }catch (e:any) {
        console.log(e)
        res.json({success:true,message:e.message}).status(500)
    }
};

export default registerMember;
