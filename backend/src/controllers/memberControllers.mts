import {Request,Response} from "express";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import memberModel from "../models/memberModel.mjs";
import * as mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary"
import bookModel from "../models/bookModel.mjs";
import Issue from "../models/issueModel.mjs";
import librarianModel from "../models/librarianModel.mjs";
import authMember from "../middlewares/authUser.mjs";

// Extend Request type to include `memberId`
interface CustomRequest extends Request {
    memberId?: string;
}


//API -  Get Member Profile Data by id
const getProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const mId = req.params.id;

        // Check if memberId exists
        if (!mId) {
            res.status(400).json({success: false, message: "User ID missing",});
            return;
        }

        // Fetch member and exclude password
        const memberData = await memberModel.findById(mId).select("-password");

        if (!memberData) {
            res.status(404).json({success: false, message: "User not found",});
            return;
        }

        // Check if memberId is provided
        if (!mId) {
            res.status(400).json({success: false, message: "Member ID is required",});
            return
        }

        // Return success response
        res.status(200).json({success: true, memberData});
        return ;

    } catch (e: any) {
        console.error(e);
        res.status(500).json({success: false, message: e.message});
        return ;
    }
};

interface CustomRequest extends Request {
    body: {
        name?: string;
        age?: string;
        phone?: string;
        image?:string;
        dob?: string;
        gender?: string;
    };
}

//API - Update Member Profile Data by id
const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const mId = req.params.id;
        const { name, age, phone, dob, gender,image } = req.body;
        const imageFile = req.file

        // Check if memberId is provided
        if (!mId) {
            res.status(400).json({success: false, message: "Member ID is required",});
            return
        }

        // Check if memberId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(mId))
        {res.status(400).json({success: false, message: "Invalid Member ID format",});
            return
        }

        // Update member data
        const updatedMember = await memberModel.findByIdAndUpdate(
            mId,
            { name, age, phone, dob, gender,image },
            { new: true }
        );

        // If no member was found
        if (!updatedMember) {res.status(404).json({success: false, message: "Member not found",});
            return;
        }

        if (imageFile){
            //upload ige to coudnary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL = imageUpload.secure_url

            const imageUpdate = await memberModel.findByIdAndUpdate(mId,{image:imageURL},{ new: true })
        }

        // Success
        res.status(200).json({success: true, message: "Profile Updated", updatedMember,});

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}


//API - Book Borrow
const bookBorrow = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bId, mId } = req.params;

        //Check Book id is  missing
        if (!bId || !mId){
            res.status(400).json({success: false, message: "Book ID and  Member ID  required",});
            return
        }

        const bookData = await bookModel.findById(bId)

        if (!bookData){
            res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        if (bookData.availableCopies < 1){
            res.status(400).json({success: false, message: "This Book Copies Not Available",});
            return;
        }

        const newBorrow = new Issue({
            memberId: mId,
            bookId: bId,
            issueDate: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days ahead
            status: 'issued'
        });

        bookData.availableCopies-=1
        await bookData.save()

        await newBorrow.save()

        res.status(201).json({ success: true, message: "Book borrowed successfully", borrow: newBorrow });

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};


//API - Book Return
const bookReturn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bId, mId } = req.params;

        //Check Book id is  missing
        if (!bId || !mId){
            res.status(400).json({success: false, message: "Book ID and  Member ID  required"});
            return
        }

        const bookData = await bookModel.findById(bId)

        if (!bookData){
            res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        if (bookData.availableCopies < 1){
            res.status(400).json({success: false, message: "This Book Copies Not Available",});
            return;
        }

        const issueRecord = await Issue.findOne({
            memberId: mId,
            bookId: bId,
            status: 'issued'
        })

        if (!issueRecord) {
            res.status(404).json({ success: false, message: "No active issued record found for this member and book." });
            return;
        }

        //update book availability
        bookData.availableCopies+=1
        await bookData.save()

        // Update the issue record
        issueRecord.returnDate = new Date()
        issueRecord.status = issueRecord.returnDate > issueRecord.dueDate ? "overdue" : "returned"
        await issueRecord.save()

        res.status(201).json({ success: true, message: "Book return successfully", borrow: issueRecord });

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};

//API - Search book by title
const bookSearch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.query;

        if (!title || typeof title !== "string"){
            res.status(400).json({success: false, message: "Book title is required as a query parameter",});
            return;
        }

        const bookData = await bookModel.findOne({title:title.trim()})

        if (!bookData){
            res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        res.status(200).json({ success: true, data:bookData});

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
}

export {getProfile,updateProfile,bookBorrow,bookReturn,bookSearch};
