import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import librarianModel from "../models/librarianModel.mjs";


//API - Login Librarian
const librarianLogin = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {email,password} = req.body;

        const librarian = await librarianModel.findOne({email})

        //not have librarian
        if (!librarian){
            return res.status(400).json({success:false,message:"Not Find librarian"})
        }

        const isMatch = await bcrypt.compare(password,librarian.password)

        //check if match password
        if (isMatch){
            const token = jwt.sign({id:librarian._id},process.env.JWT_SECRET as string)
            return  res.status(200).json({success:true,token})
        }else {
            return res.status(400).json({success:false,message:"Invalided Credentials"})
        }

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

export {librarianLogin}