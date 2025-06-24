import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import librarianModel from "../models/librarianModel.mjs";
import bookModel from "../models/bookModel.mjs";


//API - Login Librarian
const librarianLogin = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {email,password} = req.body;

        const librarian = await librarianModel.findOne({email})

        //not have librarian
        if (!librarian){
            return res.status(400).json({success:false,message:"Not Find librarian"})
        }

        const isMatch = await bcrypt.compare(password,librarian.password)

        //check if match password
        if (isMatch){
            const token = jwt.sign({id:librarian._id},process.env.JWT_SECRET as string)
            return  res.status(200).json({success:true,token})
        }else {
            return res.status(400).json({success:false,message:"Invalided Credentials"})
        }

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

// If you're extending Request to include librarianId:
interface AuthenticatedRequest extends Request {
    librarianId?: string;
}

//API - Add Book
const addBook = async (req: AuthenticatedRequest, res: Response):Promise<any> =>{
    try {
        const {title, author, isbn, category, description, publisher, publishYear, quantity, available} = req.body;

        //checking for all data to add book
        if (!title || !author || !isbn ||  !category || !description || !publisher || !publishYear || !quantity || !available){
            return res.status(400).json({success:false,message:"Missing Details!"})
        }

        const bookData = {
            title,
            author,
            isbn,
            category,
            description,
            publisher,
            publishYear,
            quantity,
            available,
            addedBy: req.librarianId,
        }
        const newBook = new bookModel(bookData)
        await newBook.save()

        res.json({success:true,message:"Book Add!"})

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

export {librarianLogin,addBook}