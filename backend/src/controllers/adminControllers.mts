import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import librarianModel from "../models/librarianModel.mjs";
import memberModel from "../models/memberModel.mjs";
import {v2 as cloudinary} from "cloudinary"

//API - Admin login
const loginAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials!" });
        }

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

//API - librarian account create
const addLibrarian = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {name,email,password,phone,address} = req.body;

        // Check if file exists first
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }



        //chacking all data add
        if (!name || !email || !password || !phone || !address ){
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

        //upload image upload cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.file.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const librarianData = {
            name,
            email,
            image:imageUrl,
            password:hashPassword,
            phone,
            address,
            joinedDate:Date.now()
        }


        const newLibrarian = new librarianModel(librarianData)
        await newLibrarian.save()

        return  res.status(201).json({success: true, message: "Librarian added successfully!"});

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

//API - view All Librarian
const getAllLibrarian = async (req: Request, res: Response):Promise<any> =>{
    try {
        const librarians = await librarianModel.find({}).select('-password')
        return res.status(200).json({success:true,message:librarians})
    } catch (error: any) {
        console.error(error);
        return  res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - Delete Librarian
const deleteLibrarian = async (req: Request, res: Response):Promise<any> =>{
    try {
        const librarianId = req.params.id;
        const deleted = await librarianModel.findByIdAndDelete(librarianId);

        //check is member in here
        if (!deleted){
            return res.status(404).json({ success: false, message: "Librarian not found" });
        }

        return res.status(200).json({ success: true, message: "Librarian deleted successfully" });

    } catch (error: any) {
        console.error(error);
        return  res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

export {loginAdmin,addLibrarian,getAllMemers,getAllLibrarian,deleteLibrarian}

