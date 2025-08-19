import {Request,Response} from "express";
import bookModel from "../models/bookModel.mjs";
import mongoose from "mongoose";
import Issue from "../models/issueModel.mjs";
import {v2 as cloudinary} from "cloudinary"
import issueModel from "../models/issueModel.mjs";

interface CustomRequest extends Request {
    body: {
        title?: string;
        author?: string;
        category?: string;
        description?: string;
        availableCopies?: number;
        image?:string
    };
}

//API -  Get in Book by id
const getBook = async (req: CustomRequest, res: Response) => {
    try {
        const {bookId} = req.params;

        // Check if memberId is provided
        if (!bookId) {
            res.status(400).json({success: false, message: "Book ID is required",});
            return
        }
        // Fetch member and exclude password
        const bookData = await bookModel.findById(bookId);

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

interface AuthenticatedRequest extends Request {
    librarianId?: string;
}

//API - Add Book
const addBook = async (req: AuthenticatedRequest, res: Response):Promise<any> =>{
    try {
        const {title, author, category, description,availableCopies} = req.body;

        const imageFile = req.file

        // Check if file exists first
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        //checking for all data to add book
        if (!title || !author ||  !category || !description || !availableCopies){
            return res.status(400).json({success:false,message:"Missing Details!"})
        }

        //upload image upload cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const bookData = {
            title,
            author,
            image:imageUrl,
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
        return res.status(200).json({success:true,data:books})

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

//API - Search book by title
const bookSearchByTitle = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.query;

        if (!title || typeof title !== "string"){
            res.status(400).json({success: false, message: "Book title is required as a query parameter",});
            return;
        }

        // Regex for case-insensitive partial match
        const regex = new RegExp(title.trim(), "i");

        const bookData = await bookModel.find({ title: { $regex: regex } }).limit(10);

        if (!bookData || bookData.length === 0) {
            res.status(404).json({ success: false, message: "Book not found" });
            return;
        }

        res.status(200).json({ success: true, data: bookData });

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
}

//API - Book Borrow
const bookBorrow = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookId, memberId } = req.params;

        //Check Book id is  missing
        if (!bookId || !memberId){
            res.status(400).json({success: false, message: "Book ID and  Member ID  required",});
            return
        }


        // // Check if the member has already borrowed this specific book
        // const alreadyIssuedBook = await issueModel.findOne({
        //     memberId,
        //     bookId,
        //     status: "issued"
        // });
        //
        // if (alreadyIssuedBook) {
        //      res.status(400).json({success: false, message: "You have already borrowed this book. Please return it before borrowing again."});
        //     return
        // }


        const bookData = await bookModel.findById(bookId)

        if (!bookData){
            res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        if (bookData.availableCopies < 1){
            res.status(400).json({success: false, message: "This Book Copies Not Available",});
            return;
        }


        const newBorrow = new Issue({
            memberId: memberId,
            bookId: bookId,
            issueDate: new Date(),
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'issued'
        });

        bookData.availableCopies-=1
        await bookData.save()

        await newBorrow.save()

        res.status(201).json({ success: true, message: "Book borrowed successfully", borrow: newBorrow });

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};


//API - Book Return
const bookReturn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookId, memberId } = req.params;

        //Check Book id is  missing
        if (!bookId || !memberId){
            res.status(400).json({success: false, message: "Book ID and  Member ID  required"});
            return
        }

        const bookData = await bookModel.findById(bookId)

        if (!bookData){
            res.status(404).json({success: false, message: "Book not found",});
            return;
        }

        if (bookData.availableCopies < 1){
            res.status(400).json({success: false, message: "This Book Copies Not Available",});
            return;
        }

        const issueRecord = await Issue.findOne({
            memberId: memberId,
            bookId: bookId,
            status: 'issued'
        })

        if (!issueRecord) {
            res.status(404).json({ success: false, message: "No active issued record found for this member and book." });
            return;
        }

        //update book availability
        bookData.availableCopies+=1
        await bookData.save()

        // Update the issue record
        issueRecord.returnDate = new Date()
        issueRecord.status = issueRecord.returnDate > issueRecord.dueDate ? "overdue" : "returned"
        await issueRecord.save()

        res.status(201).json({ success: true, message: "Book return successfully", return: issueRecord });

    } catch (error: any) {
        console.error("Issue error:", error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
};

const bookAlreadyBorrow= async (req: Request, res: Response): Promise<void> => {
    try {
        const {bookId,memberId} = req.body

        //Check Book id is  missing
        if (!bookId || !memberId){
            res.status(400).json({success: false, message: "Book ID and  Member ID  required"});
            return
        }

        // Check if the member has already borrowed this specific book
        const alreadyIssuedBook = await issueModel.findOne({
            memberId,
            bookId,
            status: "issued"
        });

        if (alreadyIssuedBook) {
            res.status(400).json({
                success: false,
                message: "You have already borrowed this book. Please return it before borrowing again."
            });
            return
        }

        res.status(200).json({ success: true,message: "You can borrow this book."});

    }catch (error: any) {
        console.error( error);
        res.status(500).json({success: false, message: "Something went wrong.", error: error.message,});
    }
}
export {getBook,addBook,getAllBooks,updateBook,deleteBook,bookSearchByTitle,bookBorrow,bookReturn,bookAlreadyBorrow}