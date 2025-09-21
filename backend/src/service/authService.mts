import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import memberModel from "../models/memberModel.mjs";
import librarianModel from "../models/librarianModel.mjs";
import {Request} from "express";
import {LoginBody, RegisterBody} from "../types/auth";

export class AuthService{

    //API - Login
    login = async (req: Request<{},{},LoginBody>) => {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return { success: false, status: 400, message: "Missing required fields" };
            }

            let user:any = null;
            let userType:string = "";

            if (role === "member") {
                user = await memberModel.findOne({ email });
                userType = "member";
            } else if (role === "librarian") {
                user = await librarianModel.findOne({ email });
                userType = "librarian";
            } else if (role === "admin") {
                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                    const token = jwt.sign({ id: "admin", role: "admin" }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
                    return { success: true, status: 200, message: "Admin login successful",token:token };
                } else {
                    return { success: false, status: 401, message: "Invalid admin credentials" };
                }
            } else {
                return { success: false, status: 400, message: "Invalid role" };
            }

            if (!user) {
                return { success: false, status: 404, message: `${role} not found` };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { success: false, status: 400, message: "Invalid password" };
            }

            const token = jwt.sign({ id: user._id, role: userType }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

            return { success: true, status: 200, message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful`,data: { id: user._id, email: user.email,role:user.role },token:token };
        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Internal server error", error: error.message};
        }
    };

    //API - Register
    register = async (req: Request<{},{},RegisterBody>) => {
        try {
            const { password, username, email, role } = req.body;

            // Validate required fields
            if (!password || !email || !username || !role) {
                return { success: false, status: 400, message: "Missing required fields" };
            }

            // Validate email format
            if (!validator.isEmail(email)) {
                return { success: false, status: 400, message: "Enter a valid email" };
            }

            // Validate password length
            if (password.length < 8) {
                return { success: false, status: 400, message: "Password must be at least 8 characters long" };
            }

            // Check if user already exists by email or username
            const existingUser = await memberModel.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return { success: false, status: 409, message: "User already exists" };
            }

            // Hash password securely
            const hashedPassword = await bcrypt.hash(password, 10);

            if (role !== "member") {
                return { success: false, status: 400, message: "Invalid role" };
            }

            // Create new user document
            const newUser = await memberModel.create({
                email,
                username,
                password: hashedPassword,
            });

            // Generate JWT token
            const token = jwt.sign({ id: newUser._id, role: role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

            return {
                success: true,
                status: 201,
                message: "Member registration successful",
                data: {
                    email: newUser.email,
                    username: newUser.username,
                    role: role,
                },
                token:token };
        } catch (e: any) {
            console.error(e);
            return {success: false, status: 500, message: "Internal server error", error: e.message};
        }
    };
}

export default new AuthService()