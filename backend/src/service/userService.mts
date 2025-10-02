import memberModel from "../models/memberModel.mjs";
import mongoose, {Types} from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import issueModel from "../models/issueModel.mjs";
import librarianModel from "../models/librarianModel.mjs";
import {Profile, ProfileReq, ProfileRes, UpdateProfile, UpdateProfileRes} from "../types/profile";

export class UserService{

    // API - Get User Profile
    getProfile = async (req: ProfileReq): Promise<ProfileRes>  => {
        try {
            const { id, role } = req.params;

            let profile:Profile | null = null;

            // check in userId enter
            if (!id) {
                return { success: false,status: 400, message: "Missing User ID" }
            }

            if (!role) {
                return { success: false,status: 400, message: "Invalid role" }
            }

            if (role === "member") {
                profile = await memberModel.findById(id);
            } else if (role === "librarian") {
                profile = await librarianModel.findById(id);
            } else {
                return {success: false, status: 400, message: "Invalid role" };
            }

            if (!profile) {
                return {success: false, status: 404, message: "Profile not found" };
            }

            return {success: true, status: 200, data:profile};
        } catch (e: any) {
            console.log(e);
            return {success: false, status: 500, message: `Internal server error ${e.message}`};
        }
    };

    // API - Update User Profile
    updateProfile = async (req: ProfileReq):Promise<UpdateProfileRes> => {
        try {
            const { id, role } = req.params;

            if (!id || !Types.ObjectId.isValid(id)) {
                return {success: false, status: 400, message: "Missing User ID"};
            }

            if (!role) {
                return {success: false, status: 400, message: "Missing User role"};
            }

            const { full_name, phone, address } = req.body || {};
            const imageFile = (req as any).file;

            let updatedProfile = null;

            if (role === "member") {
                const existingProfile = await memberModel.findById(id);
                if (!existingProfile) {
                    return {success: false, status: 400, message: "User profile not found"};
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
                    return {success: false, status: 404, message: "Member not found"};
                }

            } else if (role === "librarian") {
                const existingProfile = await librarianModel.findById(id);
                if (!existingProfile) {
                    return {success: false, status: 404, message: "User profile not found"};
                }

                let imageURL = existingProfile.image || null;

                if (imageFile) {
                    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                        resource_type: "image",
                    });
                    imageURL = imageUpload.secure_url;
                }

                updatedProfile = await librarianModel.findByIdAndUpdate<UpdateProfile>(
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
                    return {success: false, status: 404, message: "Librarian not found"};
                }

            } else {
                return {success: false, status: 400, message: "Invalid role"};
            }

            return {success: true, status: 200, data: updatedProfile};
        } catch (e: any) {
            console.error(e);
            return {success: false, status: 500, message: `Internal server error ${e.message}`};
        }
    };

    // API - Delete User Profile
    deleteProfile = async (req: ProfileReq) => {
        try {
            const {id, role} = req.params;

            if (!id) {
                return {success: false, status: 400, message: "Missing User ID"};
            }

            if (!role) {
                return {success: false, status: 400, message: "Missing User role"};
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {success: false, status: 400, message: "Invalid User ID format"};
            }

            if (role === "member") {
                // Delete issues related to this member
                await issueModel.deleteMany({memberId: new mongoose.Types.ObjectId(id)});

                // Delete the member profile
                const deleteResult = await memberModel.deleteOne({_id: id});

                if (deleteResult.deletedCount === 0) {
                    return {success: false, status: 404, message: "Member profile not found"};
                }
            } else {
                return {success: false, status: 404, message: "Invalid role"};
            }

            return {success: false, status: 200, message: `${role} profile deleted successfully`};
        } catch (e: any) {
            console.error(e);
            return {success: false, status: 500, message: "Internal server error", error: e.message};
        }
    };
}

export default new UserService()