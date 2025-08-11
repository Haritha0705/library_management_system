import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import memberModel from "../models/memberModel.mjs";
import librarianModel from "../models/librarianModel.mjs";
import memberProfileModel from "../models/memberProfileModel.mjs";

//API - User Login
const userLogin = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let user;
        let userType;

        if (role === "member") {
            user = await memberModel.findOne({ email });
            userType = "member";
        } else if (role === "librarian") {
            user = await librarianModel.findOne({ email });
            userType = "librarian";
        } else if (role === "admin") {
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign({ id: "admin", role: "admin" }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
                return res.status(200).json({ success: true, message: "Admin login successful", token });
            } else {
                return res.status(401).json({ success: false, message: "Invalid admin credentials" });
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: `${role} not found` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, role: userType }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        return res.status(200).json({
            success: true,
            message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful`,
            data: { id: user._id, email: user.email },
            token
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

//API - User Register
const userRegister = async (req: Request, res: Response): Promise<any> => {
    try {
        const { password, username, email, role } = req.body;

        // Validate required fields
        if (!password || !email || !username || !role) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }


        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Check if user already exists by email or username
        const existingUser = await memberModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Only supporting 'member' role here — extend logic for others if needed
        if (role !== "member") {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        // Create new user document
        const newUser = await memberModel.create({
            email,
            username,
            password: hashedPassword,
        });

        // Create empty profile linked to new user
        const newProfile = await memberProfileModel.create({
            member: newUser._id,
            full_name: "",
            bio: "",
            phone: "",
            address: "",
            profilePic: "",
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, role: role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            success: true,
            message: "Member registration successful",
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                role: role,
            },
            token,
        });
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ success: false, message: "Something went wrong", error: e.message });
    }
};


export { userLogin, userRegister };
