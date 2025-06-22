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
            return res.status(400).json({success:false,message:"Missing details!"})
        }

        //email validate check
        if (!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Enter valid email!"})
        }

        //password is strong or not check
        if (password.length > 8){
            return res.status(400).json({success:false,message:"Enter valid password!"})
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
        return  res.status(201).json({success:true,token})

    }catch (e:any) {
        console.log(e)
        return  res.status(500).json({success:true,message:e.message})
    }
};

const loginMember = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {email,password} = req.body

        //find member in db
        const member = await memberModel.findOne({email})

        //is memer is not or here
        if (!member){
            return  res.status(404).json({success:false,message:"user does not exits"})
        }

        //hashing password check and jwt token process
        const isMatch = await bcrypt.compare(password,member.password)
        if (isMatch) {
            const token = jwt.sign({id: member._id}, process.env.JWT_SECRET as string);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid Credentials!" });
        }


    }catch (e:any){
        console.log(e)
        res.status(500).json({success:true,message:e.message})
    }
}

export {registerMember,loginMember};
