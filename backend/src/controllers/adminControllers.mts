import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import librarianModel from "../models/librarianModel.mjs";
import memberModel from "../models/memberModel.mjs";

//API - Admin login
const loginAdmin = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {email,password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET as string);
            return res.status(200).json({ success: true, token });
        }else {
            return res.status(400).json({ success: false, message: "Invalid Credentials!" });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - librarian account create
const addLibrarian = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {name,email,password,phone,address} = req.body;

        //chacking all data add
        if (!name || !email || !password || !phone || !address){
            return  res.status(400).json({success: false, message: "Missing Details!"});
        }

        //validating email format
        if (!validator.isEmail(email)){
            return  res.status(400).json({success: false, message: "Please enter valid email!"});
        }

        //password is strong
        if (password.length < 8){
            return  res.status(400).json({success: false, message: "Please enter strong password!"});
        }

        //hashing doctor password
        const salt =  await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const librarianData = {
            name,
            email,
            password:hashPassword,
            phone,
            address,
            joinedDate:Date.now()
        }

        const newLibrarian = new librarianModel(librarianData)
        newLibrarian.save()

        return  res.status(400).json({success: true, message: "Add Librarian"});

    } catch (error: any) {
        console.error(error);
        return  res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - view All Members
const getAllMemers = async (req: Request, res: Response):Promise<any> =>{
    try {
        const members = await memberModel.find({}).select('-password')
        return res.status(200).json({success:true,message:members})
    } catch (error: any) {
        console.error(error);
        return  res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

export {loginAdmin,addLibrarian,getAllMemers}

