import {Request,Response} from "express";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import memberModel from "../models/memberModel.mjs";
import * as mongoose from "mongoose";
import bookModel from "../models/bookModel.mjs";
import issueModel from "../models/issueModel.mjs";
import librarianModel from "../models/librarianModel.mjs";

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
            password:hash_password,
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
        dob?: string;
        gender?: string;
    };
}

//API - Update Member Profile Data by id
const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const mId = req.params.id;
        const { name, age, phone, dob, gender } = req.body;

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
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - Book Issue
const bookIssue = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookId, memberId, issuedBy, dueDate } = req.body;

        // Validate input
        if (!bookId || !memberId || !issuedBy || !dueDate) {
            res.status(400).json({ success: false, message: "All fields are required." });
            return;
        }

        // Find Book
        const book = await bookModel.findById(bookId);
        if (!book) {
            res.status(404).json({ success: false, message: "Book not found." });
            return;
        }

        if (book.available < 1){
            res.status(400).json({ success: false, message: "Book not available" });
            return;
        }

        // Check Member
        const member = await memberModel.findById(memberId);
        if (!member) {
            res.status(404).json({ success: false, message: "Member not found." });
            return;
        }

        // Check Librarian (issuedBy)
        const librarian = await librarianModel.findById(issuedBy);
        if (!librarian) {
            res.status(404).json({ success: false, message: "Librarian not found" });
            return;
        }

        // Create issue record
        const issueRecord = new issueModel({
            bookId,
            memberId,
            issuedBy,
            dueDate,
        });

        await issueRecord.save();

        book.available-=1;
        await book.save()

        res.status(201).json({success: true, message: "Book issued successfully.", issue: issueRecord,});

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};

//API - Book Return
const bookReturn = async (req: Request, res: Response): Promise<void> => {
    try {
        const issueId = req.params.id;

        if (!issueId) {
            res.status(400).json({ success: false, message: "Issue ID is required" });
            return;
        }

        //Find the issue
        const issue = await issueModel.findById(issueId)
        if (!issue){
            res.status(404).json({ success: false, message: "Issue not found" });
            return;
        }

        // Update status and returnDate
        issue.status = "returned";
        issue.returnDate = new Date();

        await issue.save();

        if (issue.status === "returned"){
            res.status(400).json({ success: false, message: "Book already returned" });
            return;
        }

        const book = await bookModel.findById(issue.bookId)
        if (book){
            if (book.quantity > book.available){
                book.available+=1
                await book.save()
            }
        }

        res.status(200).json({success: true, message: "Book return successfully.", issue: issue,});

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};

//API - Book Issue
const issueBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const issuedBooks = await issueModel.find({status:"issued"})
            .populate("bookId")
            .populate("memberId")
            .populate("issuedBy");

        res.status(200).json({success: true, message: "Book issued successfully.", count:issuedBooks.length,issuedBooks});

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};

//API - Book overdue
const overdueBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const today = new Date();
        //Find the issue
        const issueBooks = await issueModel.find({status:"issued"})

        const updateOverDueBook = []

        for (const book of issueBooks){
            if (book.dueDate < today){
                book.status = "overdue"
                book.returnDate = new Date();
                await book.save()
                updateOverDueBook.push(book)
            }
        }

        const overdueList = await issueModel.find({status:"overdue"})

        res.status(200).json({success: true, message: "Overdue books updated and fetched successfully.", count: overdueList.length, overdueBooks: overdueList,});

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message});
    }
}

export {registerMember,loginMember,logoutMember,getProfile,updateProfile,bookIssue,bookReturn,issueBooks,overdueBooks};
