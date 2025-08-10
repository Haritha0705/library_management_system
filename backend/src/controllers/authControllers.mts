import {Request,Response} from "express";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import memberModel from "../models/memberModel.mjs";
import librarianModel from "../models/librarianModel.mjs";
import memberProfileModel from "../models/memberProfileModel.mjs";

interface CustomRequest extends Request {
    email:string;
    password:string;
    role: "admin" | "librarian" | "member"
}

//API - Login
const userLogin = async (req:CustomRequest,res:Response):Promise<any> =>{
    try {
        const { email, password,role } = req.body;

        if (!email || !password || !role) {
            return { success: false, status: 400, message: "Missing required fields" };
        }

        let user;
        let userType;

        if (role === "member") {
            user = await memberModel.findOne({ where: { email } });
            userType = "member"

        } else if (role === "librarian") {
            user = await librarianModel.findOne({ where: { email } });
            userType = "librarian"

        } else if(role === "admin"){
            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = jwt.sign(
                    { id: "admin", role: "admin" },
                    process.env.JWT_SECRET as string,
                    { expiresIn: "1d" }
                );
                return { success: true, status: 200, message: "Admin login successful", token };

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
            return { success: false, status: 401, message: "Invalid password" };
        }

        const token = jwt.sign(
            {id:user.id,role:userType},
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )

        return {success: true, status: 200, message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful`, data: {id: user.id, email: user.email,}, token};
    }catch (error:any) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
}

//API - User Register

const register = async (req: Request,res:Response) => {
        try {
            const { password, username, email, role } = req.body;

            let newUser,newProfile,userType

            // Check required fields
            if (!password || !email || !username || !role) {
                return  { success: false,status:400, message: "Missing some required fields" }
            }

            // Validate email
            if (!validator.isEmail(email)) {
                return { success: false,status:400, message: "Enter a valid email!" }
            }

            // Check password length
            if (password.length < 8) {
                return { success: false,status:400, message: "Password must be at least 8 characters long" }
            }

            // Check if user already exists
            const existingUser = await memberModel.find({ where: { OR: [{ email }, { username }] } })

            if (existingUser) {
                return { success: false,status:409, message: "User already exists" }
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user and generate JWT
            if (role === "member") {
                userType = "member"
                newUser = await memberModel.create({
                    data: {
                        email,
                        username,
                        password: hashedPassword
                    },
                });

                newProfile = await memberProfileModel.create({
                    data:{
                        studentId: newUser.id,
                        full_name: "",
                        bio: "",
                        phone: "",
                        address: "",
                        profilePic: "",
                    }
                })
            } else {
                return { success: false,status:400, message: "Invalid Role" }
            }

            const token = jwt.sign({ id:newUser.id,role:userType }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

            return { success: true,status:201,message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} register successful`,user: newUser, token }

        } catch (e: any) {
            console.log(e);
            return  { success: false,status:500, message: "Something went wrong", error: e.message }
        }
    }
export {userLogin}