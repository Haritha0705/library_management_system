import {Request,Response} from "express";
import bookModel from "../models/bookModel.mjs";

interface CustomRequest extends Request {
    body: {
        title?: string;
        author?: string;
        category?: string;
        description?: string;
        availableCopies?: number;
    };
}

//API -  Get in Book by id
const getBook = async (req: CustomRequest, res: Response) => {
    try {
        const {id} = req.params;

        // Check if memberId is provided
        if (!id) {
            res.status(400).json({success: false, message: "Book ID is required",});
            return
        }
        // Fetch member and exclude password
        const bookData = await bookModel.findById(id);

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

export {getBook}