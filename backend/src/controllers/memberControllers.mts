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

export {getProfile,updateProfile};
