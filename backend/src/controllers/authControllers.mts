import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import memberModel from "../models/memberModel.mjs";
import librarianModel from "../models/librarianModel.mjs";
import memberProfileModel from "../models/memberProfileModel.mjs";


// User Login
const userLogin = async (req: Request, res: Response) => {
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

// User Register
const userRegister = async (req: Request, res: Response) => {
    try {
        const { password, username, email, role } = req.body;

        if (!password || !email || !username || !role) {
            return res.status(400).json({ success: false, message: "Missing some required fields" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email!" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const existingUser = await memberModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser, newProfile, userType;

        if (role === "member") {
            userType = "member";
            newUser = await memberModel.create({
                email,
                username,
                password: hashedPassword
            });

            newProfile = await memberProfileModel.create({
                studentId: newUser._id,
                full_name: "",
                bio: "",
                phone: "",
                address: "",
                profilePic: "",
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        const token = jwt.sign({ id: newUser._id, role: userType }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        return res.status(201).json({
            success: true,
            message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} register successful`,
            user: newUser,
            token
        });
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ success: false, message: "Something went wrong", error: e.message });
    }
};

export { userLogin, userRegister };
