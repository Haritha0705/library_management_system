import {Request} from "express";
import bookModel from "../models/bookModel.mjs";
import mongoose from "mongoose";
import Issue from "../models/issueModel.mjs";
import {v2 as cloudinary} from "cloudinary"
import issueModel from "../models/issueModel.mjs";
import {BookAlreadyBorrowBody, BookBody, BookUpdateBody, BorrowHistoryBody} from "../types/book";

export class BookService {

    //API -  Get in Book by id
    getBook = async (req: Request<{ bookId: string }>) => {
        try {
            const {bookId} = req.params;

            // Check if memberId is provided
            if (!bookId) {
                return {success: false, status: 400, message: "Book ID is required"};
            }
            // Fetch member and exclude password
            const bookData = await bookModel.findById(bookId);

            if (!bookData) {
                return {success: false, status: 404, message: "Book not found"};
            }

            // Return success response
            return {success: true, status: 200, data: bookData};

        } catch (e: any) {
            console.error(e);
            return {success: false, status: 500, message: "Something went wrong", error: e.message,};
        }
    };

    //API - Add Book
    addBook = async (req: Request<{}, {}, BookBody>) => {
        try {
            const {title, author, category, description, availableCopies} = req.body;

            const imageFile = req.file

            // Check if file exists first
            if (!imageFile) {
                return {success: false, status: 400, message: "Image file is required"};
            }

            //checking for all data to add book
            if (!title || !author || !category || !description || !availableCopies) {
                return {success: false, status: 400, message: "Missing Details!"};
            }

            //upload image upload cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
            const imageUrl = imageUpload.secure_url

            const bookData = {
                title,
                author,
                image: imageUrl,
                category,
                description,
                availableCopies
            }
            const newBook = new bookModel(bookData)
            await newBook.save()

            return {success: true, status: 201, message: "Book Add!"};

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message,};
        }
    }

    //API - view All Books
    getAllBooks = async (_: Request) => {
        try {
            const books = await bookModel.find({})
            return {success: true, status: 200, data: books};

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message};
        }
    }

    //API - Update Book
    updateBook = async (req: e.Request<{ id: string }, {}, BookUpdateBody>) => {
        try {
            const {id} = req.params;
            const {title, author, category, description, availableCopies} = req.body;
            const imageFile = (req as any).file;

            // Validate bookId
            if (!id) {
                return {success: false, status: 400, message: "Book ID is required"};
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {success: false, status: 400, message: "Invalid Book ID format"};
            }

            // Find existing book
            const existingBook = await bookModel.findById(id);
            if (!existingBook) {
                return {success: false, status: 404, message: "Book not found"};
            }

            // Handle image upload
            let imageURL = existingBook.image || null;
            if (imageFile) {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                    resource_type: "image",
                });
                imageURL = imageUpload.secure_url;
            }

            // Update book data
            const updatedBook = await bookModel.findByIdAndUpdate(
                id,
                {title, author, category, description, availableCopies, image: imageURL},
                {new: true}
            );

            return {success: true, status: 200, message: "Book updated successfully", data: updatedBook};

        } catch (error: any) {
            console.error(error);
            return {success: false, status: 500, message: "Something went wrong", error: error.message};
        }
    };

    //API - Delete Book
    deleteBook = async (req: Request<{ id: string }>) => {
        try {
            const {id} = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return {success: false, status: 400, message: "Invalid book ID"};
            }

            const deleted = await bookModel.findByIdAndDelete(id);

            if (!deleted) {
                return {success: false, status: 404, message: "Book not found"};
            }

            return {success: true, status: 200, message: "Book deleted successfully"};

        } catch (error: any) {
            console.error(error);
            return {success: true, status: 500, message: "Something went wrong", error: error.message};
        }
    }

    //API - Search book by title
    bookSearchByTitle = async (req: Request<{}, {}, {}, { title?: string }>) => {
        try {
            const {title} = req.query;

            if (!title) {
                return {success: false, status: 400, message: "Book title is required as a query parameter"};
            }

            // Regex for case-insensitive partial match
            const regex = new RegExp(title.trim(), "i");

            const bookData = await bookModel.find({title: {$regex: regex}}).limit(10);

            if (!bookData || bookData.length === 0) {
                return {success: false, status: 404, message: "Book not found"};
            }

            return {success: true, status: 200, data: bookData};

        } catch (error: any) {
            console.error("Issue error:", error);
            return {success: true, status: 500, message: "Something went wrong", error: error.message};
        }
    }

    //API - Book Borrow
    bookBorrow = async (req: Request<{ bookId: string, memberId: string }>) => {
        try {
            const {bookId, memberId} = req.params;

            //Check Book id is  missing
            if (!bookId || !memberId) {
                return {success: false, status: 400, message: "Book ID and  Member ID  required"};
            }

            const bookData = await bookModel.findById(bookId)

            if (!bookData) {
                return {success: false, status: 404, message: "Book not found"};
            }

            // Check if the member has already borrowed some book
            const alreadyIssuedBook = await issueModel.findOne({
                memberId,
                bookId,
                status: "issued"
            });

            if (alreadyIssuedBook) {
                return {
                    success: false,
                    status: 400,
                    message: "You have already borrowed this book. Please return it before borrowing again."
                };
            }

            if (bookData.availableCopies < 1) {
                return {success: false, status: 400, message: "This Book Copies Not Available"};
            }

            const newBorrow = new Issue({
                memberId: memberId,
                bookId: bookId,
                issueDate: new Date(),
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: 'issued'
            });

            bookData.availableCopies -= 1
            await bookData.save()

            await newBorrow.save()

            return {success: true, status: 201, message: "Book borrowed successfully", data: newBorrow};

        } catch (error: any) {
            console.error("Issue error:", error);
            return {success: true, status: 500, message: "Something went wrong", error: error.message};
        }
    };


    //API - Book Return
    bookReturn = async (req: Request<{ bookId: string, memberId: string }>) => {
        try {
            const {bookId, memberId} = req.params;

            //Check Book id is  missing
            if (!bookId || !memberId) {
                return {success: false, status: 400, message: "Book ID and  Member ID  required"};
            }

            const bookData = await bookModel.findById(bookId)

            if (!bookData) {
                return {success: false, status: 404, message: "Book not found"};
            }

            if (bookData.availableCopies < 1) {
                return {success: false, status: 400, message: "This Book Copies Not Available"};
            }

            const issueRecord = await Issue.findOne({
                memberId: memberId,
                bookId: bookId,
                status: 'issued'
            })

            if (!issueRecord) {
                return {
                    success: false,
                    status: 404,
                    message: "No active issued record found for this member and book."
                };
            }

            //update book availability
            bookData.availableCopies += 1
            await bookData.save()

            // Update the issue record
            issueRecord.returnDate = new Date()
            issueRecord.status = issueRecord.returnDate > issueRecord.dueDate ? "overdue" : "returned"
            await issueRecord.save()

            return {success: true, status: 201, message: "Book return successfully", data: issueRecord};

        } catch (error: any) {
            console.error("Issue error:", error);
            return {success: true, status: 500, message: "Something went wrong", error: error.message};
        }
    };

    //API - Book Already Borrow
    bookAlreadyBorrow = async (req: Request<{}, {}, BookAlreadyBorrowBody>) => {
        try {
            const {bookId, memberId} = req.body

            //Check Book id is  missing
            if (!bookId || !memberId) {
                return {success: false, status: 400, message: "Book ID and  Member ID  required"};
            }

            // Check if the member has already borrowed some book
            const alreadyIssuedBook = await issueModel.findOne({
                memberId,
                bookId,
                status: "issued"
            });

            if (alreadyIssuedBook) {
                return {
                    success: false,
                    status: 400,
                    message: "You have already borrowed this book. Please return it before borrowing again."
                };
            }

            return {success: true, status: 200, message: "You can borrow this book."};

        } catch (error: any) {
            console.error(error);
            return {success: true, status: 500, message: "Something went wrong", error: error.message};
        }
    }

    // API - Book Borrow History
    bookBorrowHistory = async (req: Request<{}, {}, BorrowHistoryBody>) => {
        try {
            const {memberId} = req.body;

            // Check if memberId is missing
            if (!memberId) {
                return {success: false, status: 400, message: "Member ID is required"};
            }

            // Populate book details (title, image)
            const bookHistory = await issueModel.find({memberId}).populate("bookId", "title image")

            if (!bookHistory || bookHistory.length === 0) {
                return {success: false, status: 404, message: "No borrow history found for this member"};
            }

            return {success: true, status: 200, data: bookHistory};

        } catch (error: any) {
            console.error("Book Borrow History Error:", error);
            return {success: true, status: 500, message: "Something went wrong", error: error.message};
        }
    }
}
export default new BookService()