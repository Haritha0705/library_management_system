import { Request, Response } from "express";
import memberModel from "../models/memberModel.mjs";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import memberProfileModel from "../models/memberProfileModel.mjs";
import librarianProfileModel from "../models/librarianProfileModel.mjs";
import issueModel from "../models/issueModel.mjs";
import librarianModel from "../models/librarianModel.mjs";

interface CustomRequest extends Request {
    user?: { id: string; role: string };
}

// API - Get User Profile
const getProfile = async (req: CustomRequest, _: Response):Promise<any> => {
    try {
        const { userId, role } = req.params;

        let profile;

        // check in userId enter
        if (!userId) {
            return { success: false, status: 400, message: "Missing User ID" };
        }

        if (!role) {
            return { success: false, status: 400, message: "Missing User role" };
        }

        if (role === "member") {
            profile = await memberProfileModel.findOne({ member: userId });
        } else if (role === "librarian") {
            profile = await librarianProfileModel.findOne({ librarian: userId });
        } else {
            return { success: false, message: "Invalid role" };
        }

        if (!profile) {
            return { success: false, message: "Profile not found" };
        }

        return { success: true, status: 200, profile };
    } catch (e: any) {
        console.log(e);
        return { success: false, status: 500, message: "Internal server error", error: e.message };
    }
};

// API - Update User Profile
const updateProfile = async (req: CustomRequest):Promise<any> => {
    try {
        const { userId, role } = req.params;

        let updatedProfile: any = null;

        // check in id enter
        if (!userId) {
            return { success: false, status: 400, message: "Missing User ID" };
        }

        if (!role) {
            return { success: false, status: 400, message: "Missing User role" };
        }

        if (role === "member") {
            const { profilePic, full_name, bio, phone, address } = req.body;
            const imageFile = (req as any).file;

            // Check if profile exists before updating
            const existingProfile = await memberProfileModel.findOne({ member: userId });

            if (!existingProfile) {
                return { success: false, status: 404, message: "User profile not found" };
            }

            // update fields (use $set)
            const updateResult = await memberProfileModel.updateMany(
                { member: userId },
                {
                    $set: {
                        profilePic,
                        full_name,
                        bio,
                        phone,
                        address,
                    },
                }
            );

            // fetch updated profile(s)
            updatedProfile = await memberProfileModel.findOne({ member: userId });

            if (!updatedProfile) {
                return { success: false, status: 404, message: "Member not found" };
            }

            if (imageFile) {
                // upload image to cloudinary
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                const imageURL = imageUpload.secure_url;

                // update member's image (use userId as id)
                await memberModel.findByIdAndUpdate(userId, { image: imageURL }, { new: true });
            }
        } else if (role === "librarian") {
            const { profilePic, full_name, bio, phone, address } = req.body;
            const imageFile = (req as any).file;

            // Check if profile exists before updating
            const existingProfile = await librarianProfileModel.findOne({ librarian: userId });

            if (!existingProfile) {
                return { success: false, status: 404, message: "User profile not found" };
            }

            // Update by the profile document _id (so we avoid assuming _id === userId)
            const profileIdToUpdate = existingProfile._id;

            const updateResult = await librarianProfileModel.findByIdAndUpdate(
                profileIdToUpdate,
                { profilePic, full_name, bio, phone, address },
                { new: true }
            );

            updatedProfile = updateResult;

            if (!updatedProfile) {
                return { success: false, status: 404, message: "Librarian not found" };
            }

            if (imageFile) {
                // upload image to cloudinary
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                const imageURL = imageUpload.secure_url;

                // update memberModel image if applicable (use userId)
                await memberModel.findByIdAndUpdate(userId, { image: imageURL }, { new: true });
            }
        } else {
            return { success: false, message: "Invalid role" };
        }

        return { success: true, status: 200, updateProfile: updatedProfile };
    } catch (e: any) {
        console.log(e);
        return { success: false, status: 500, message: "Internal server error", error: e.message };
    }
};

// API - Delete User Profile
const deleteProfile = async (req: Request):Promise<any> => {
    try {
        const { userId, role } = req.params;

        // check in id enter
        if (!userId) {
            return { success: false, status: 400, message: "Missing User ID" };
        }

        if (!role) {
            return { success: false, status: 400, message: "Missing User role" };
        }

        if (role === "member") {
            // Delete student's issues (enrollments)
            await issueModel.deleteMany({ _id: new mongoose.Types.ObjectId(userId) });

            // Delete student profile
            await memberProfileModel.deleteMany({ member: userId });

            // Delete Student (by _id)
            await memberModel.deleteMany({ _id: userId });
        } else if (role === "librarian") {
            // Delete Instructor profile
            await librarianProfileModel.deleteMany({ librarian: userId });

            // Delete Instructor (by _id)
            await librarianModel.deleteMany({ _id: userId });
        } else {
            return { success: false, message: "Invalid role" };
        }

        return { success: true, status: 200, message: `${role} profile deleted successfully` };
    } catch (e: any) {
        console.log(e);
        return { success: false, status: 500, message: "Internal server error", error: e.message };
    }
};

export { getProfile, updateProfile, deleteProfile };
