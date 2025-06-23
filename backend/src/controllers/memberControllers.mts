import {Request,Response} from "express";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import memberModel from "../models/memberModel.mjs";
import * as mongoose from "mongoose";

// Extend Request type to include `memberId`
interface CustomRequest extends Request {
    memberId?: string;
}

//API - Member Register
const registerMember = async (req: Request, res: Response):Promise<any> => {
    try {
        const {name,email,password} = req.body;

        //check in required value in here
        if (!name || !email || !password){
            return res.status(400).json({success:false,message:"Missing details!"})
        }

        //email validate check
        if (!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Enter valid email!"})
        }

        //password is strong or not check
        if (password.length > 8){
            return res.status(400).json({success:false,message:"Enter valid password!"})
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password,salt)

        const memberData = {
            name,
            email,
            password:hash_password
        }
        //save member data in db
        const newMember = new memberModel(memberData)
        const member = await newMember.save()

        const token = jwt.sign({id:member._id},process.env.JWT_SECRET as string)
        return  res.status(201).json({success:true,token})

    }catch (e:any) {
        console.log(e)
        return  res.status(500).json({success:false,message:e.message})
    }
};

//API - Member Login
const loginMember = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {email,password} = req.body

        //find member in db
        const member = await memberModel.findOne({email})

        //is memer is not or here
        if (!member){
            return  res.status(404).json({success:false,message:"user does not exits"})
        }

        //hashing password check and jwt token process
        const isMatch = await bcrypt.compare(password,member.password)
        if (isMatch) {
            const token = jwt.sign({id: member._id}, process.env.JWT_SECRET as string);
            return res.status(200).json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid Credentials!" });
        }


    }catch (e:any){
        console.log(e)
        res.status(500).json({success:false,message:e.message})
    }
}

//API - Member Logout
const logoutMember = async (req: Request, res: Response):Promise<any> =>{
    try {
        //clear token
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })

        return res.status(200).json({success: true, message: "Logout successful!"})
    }catch (e:any){
        console.log(e)
        res.status(500).json({success:false,message:e.message})
    }
}

//API -  Get Member Profile Data
const getProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const memberId = req.memberId;

        // Check if memberId exists
        if (!memberId) {
            res.status(400).json({success: false, message: "User ID missing",});
            return;
        }

        // Fetch member and exclude password
        const memberData = await memberModel.findById(memberId).select("-password");

        if (!memberData) {
            res.status(404).json({success: false, message: "User not found",});
            return;
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
        memberId?: string;
        name?: string;
        age?: string;
        phone?: string;
        dob?: string;
        gender?: string;
    };
}

//API -  Update Member Profile Data
const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { memberId, name, age, phone, dob, gender } = req.body;

        // Check if memberId is provided
        if (!memberId) {
            res.status(400).json({success: false, message: "Member ID is required",});
            return
        }

        // Check if memberId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(memberId))
        {res.status(400).json({success: false, message: "Invalid Member ID format",});
            return
        }

        // Update member data
        const updatedMember = await memberModel.findByIdAndUpdate(
            memberId,
            { name, age, phone, dob, gender },
            { new: true }
        );

        // If no member was found
        if (!updatedMember) {res.status(404).json({success: false, message: "Member not found",});
            return;
        }

        // Success
        res.status(200).json({success: true, message: "Profile Updated", updatedMember,});

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export {registerMember,loginMember,logoutMember,getProfile,updateProfile};
