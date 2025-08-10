import {Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import librarianModel from "../models/librarianModel.mjs";
import bookModel from "../models/bookModel.mjs";
import memberModel from "../models/memberModel.mjs";
import mongoose from "mongoose";

// If you're extending Request to include librarianId:
interface AuthenticatedRequest extends Request {
    librarianId?: string;
}

//API - Add Book
const addBook = async (req: AuthenticatedRequest, res: Response):Promise<any> =>{
    try {
        const {title, author, category, description,availableCopies} = req.body;

        //checking for all data to add book
        if (!title || !author ||  !category || !description || !availableCopies){
            return res.status(400).json({success:false,message:"Missing Details!"})
        }

        const bookData = {
            title,
            author,
            category,
            description,
            availableCopies
        }
        const newBook = new bookModel(bookData)
        await newBook.save()

        res.json({success:true,message:"Book Add!"})

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - view All Books
const getAllBooks =   async (req: Request, res: Response):Promise<any> =>{
    try {
        const books = await bookModel.find({})
        return res.status(200).json({success:true,message:books})

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

interface CustomRequest extends Request {
    body: {
        title?: string;
        author?: string;
        category?: string;
        description?: string;
        availableCopies?: number;
    };
}

//API - Update Book
const updateBook= async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const lId = req.params.id;
        const {title, author, category, description, availableCopies} = req.body;

        // Check if memberId is provided
        if (!lId){
            res.status(400).json({success: false, message: "Book isbn is required",});
            return
        }

        // Check if isbn is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(lId))
        {res.status(400).json({success: false, message: "Invalid isbn format",});
            return
        }

        // Update book data
        const updatedBook = await bookModel.findByIdAndUpdate(
            lId,
            { title, author, category, description, availableCopies },
            { new: true }
        )

        // If no isbn was found
        if (!updatedBook) {res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        // Success
        res.status(200).json({success: true, message: "Book Updated", updatedBook});

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API - Delete Book
const deleteBook = async (req: Request, res: Response):Promise<any> =>{
    try {
        const lId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(lId)) {
            return res.status(400).json({ success: false, message: "Invalid book ID" });
        }

        const deleted = await bookModel.findByIdAndDelete(lId);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ success: true, message: "Book deleted successfully" });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}

//API -  Get in Book by id
const getBook = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const {bId} = req.params;

        // Check if memberId is provided
        if (!bId) {
            res.status(400).json({success: false, message: "Book ID is required",});
            return
        }
        // Fetch member and exclude password
        const bookData = await bookModel.findById(bId);

        if (!bookData) {
            res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        // Return success response
        res.status(200).json({success: true, bookData});
        return ;

    } catch (e: any) {
        console.error(e);
        res.status(500).json({success: false, message: e.message});
        return ;
    }
};

export {addBook,getAllBooks,updateBook,deleteBook,getBook}