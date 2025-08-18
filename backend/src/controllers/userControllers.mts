import { Request, Response } from "express";
import memberModel from "../models/memberModel.mjs";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import issueModel from "../models/issueModel.mjs";
import librarianModel from "../models/librarianModel.mjs";

interface CustomRequest extends Request {
    params: {
        id?: string;
        role?: string;
    };
}

// API - Get User Profile
const getProfile = async (req: CustomRequest, res: Response):Promise<void> => {
    try {
        const { id, role } = req.params;

        let profile = null;

        // check in userId enter
        if (!id) {
            res.status(400).json({ success: false, message: "Missing User ID" });
            return
        }

        if (!role) {
            res.status(400).json({ success: false, status: 400, message: "Missing User role" });
            return
        }

        if (role === "member") {
            profile = await memberModel.findById(id);
        } else if (role === "librarian") {
            profile = await librarianModel.findById(id);
        } else {
            res.json({ success: false, message: "Invalid role" })
            return
        }

        if (!profile) {
            res.json({ success: false, message: "Profile not found" });
            return
        }

        res.status(200).json({ success: true, data:profile });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal server error", error: e.message })
        return
    }
};

// API - Update User Profile
const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { id, role } = req.params;

        if (!id) {
            res.status(400).json({ success: false, message: "Missing User ID" });
            return;
        }

        if (!role) {
            res.status(400).json({ success: false, message: "Missing User role" });
            return;
        }

        const { full_name, bio, phone, address } = req.body;
        const imageFile = (req as any).file;

        let updatedProfile = null;

        if (role === "member") {
            const existingProfile = await memberModel.findById(id);
            if (!existingProfile) {
                res.status(404).json({ success: false, message: "User profile not found" });
                return;
            }

            let imageURL = existingProfile.image || null;

            if (imageFile) {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                    resource_type: "image",
                });
                imageURL = imageUpload.secure_url;
            }

            updatedProfile = await memberModel.findByIdAndUpdate(
                id,
                {
                    full_name,
                    phone,
                    address,
                    image: imageURL,
                },
                { new: true }
            );

            if (!updatedProfile) {
                res.status(404).json({ success: false, message: "Member not found" });
                return;
            }

        } else if (role === "librarian") {
            const existingProfile = await librarianModel.findById(id);
            if (!existingProfile) {
                res.status(404).json({ success: false, message: "User profile not found" });
                return;
            }

            let imageURL = existingProfile.image || null;

            if (imageFile) {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                    resource_type: "image",
                });
                imageURL = imageUpload.secure_url;
            }

            updatedProfile = await librarianModel.findByIdAndUpdate(
                existingProfile._id,
                {
                    full_name,
                    phone,
                    address,
                    image: imageURL,
                },
                { new: true }
            );

            if (!updatedProfile) {
                res.status(404).json({ success: false, message: "Librarian not found" });
                return;
            }

        } else {
            res.status(400).json({ success: false, message: "Invalid role" });
            return;
        }

        res.status(200).json({ success: true, updatedProfile });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ success: false, message: "Internal server error", error: e.message });
    }
};


// API - Delete User Profile
const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, role } = req.params;

        if (!id) {
            res.status(400).json({ success: false, message: "Missing User ID" });
            return;
        }

        if (!role) {
            res.status(400).json({ success: false, message: "Missing User role" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ success: false, message: "Invalid User ID format" });
            return;
        }

        if (role === "member") {
            // Delete issues related to this member
            await issueModel.deleteMany({ memberId: new mongoose.Types.ObjectId(id) });

            // Delete the member profile
            const deleteResult = await memberModel.deleteOne({ _id: id });

            if (deleteResult.deletedCount === 0) {
                res.status(404).json({ success: false, message: "Member profile not found" });
                return;
            }
        } else {
            res.status(400).json({ success: false, message: "Invalid role" });
            return;
        }

        res.status(200).json({ success: true, message: `${role} profile deleted successfully` });
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ success: false, message: "Internal server error", error: e.message });
    }
};

export { getProfile, updateProfile, deleteProfile };
