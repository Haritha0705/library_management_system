import {Request,Response} from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary"
import librarianModel from "../models/librarianModel.mjs";
import memberModel from "../models/memberModel.mjs";
import bookModel from "../models/bookModel.mjs";
import issueModel from "../models/issueModel.mjs";

//API - librarian account create
const addLibrarian = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {username,full_name,email,password,phone,address} = req.body;

        const imageFile = req.file

        // Check if file exists first
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        //chacking all data add
        if (!username || !full_name || !email || !password || !phone || !address ){
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
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const librarianData = {
            username,
            full_name,
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
const getAllMembers = async (_: Request, res: Response):Promise<any> =>{
    try {
        const members = await memberModel.find({}).select('-password')
        return res.status(200).json({success:true,data:members})
    } catch (error: any) {
        console.error(error);
        return  res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - view All Librarian
const getAllLibrarian = async (req: Request, res: Response):Promise<any> =>{
    try {
        const librarians = await librarianModel.find({}).select('-password')
        return res.status(200).json({success:true,data:librarians})
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

// API - Librarian Dashboard Counts
const librarianDashBoard = async (_: Request, res: Response): Promise<void> => {
    try {
        // Run counts in parallel
        const [
            memberCount,
            librarianCount,
            bookCount,
            borrowedBooksCount,
            overdueBooksCount,
            uniqueAuthors,
            uniqueCategory
        ] = await Promise.all([
            memberModel.countDocuments(),
            librarianModel.countDocuments(),
            bookModel.countDocuments(),
            issueModel.countDocuments({ status: "issued" }),
            issueModel.countDocuments({ status: "overdue" }),
            bookModel.distinct("author"),
            bookModel.distinct("category"),
        ]);

        const bookAuthorCount = uniqueAuthors.length;
        const bookCategoryCount = uniqueCategory.length;

        const allData = {
            memberCount,
            librarianCount,
            bookCount,
            borrowedBooksCount,
            overdueBooksCount,
            bookAuthorCount,
            bookCategoryCount
        };

        res.status(200).json({ success: true, data: allData });
    } catch (error: any) {
        console.error("Dashboard Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching dashboard counts",
        });
    }
};

export {addLibrarian,getAllMembers,getAllLibrarian,deleteLibrarian,librarianDashBoard}

