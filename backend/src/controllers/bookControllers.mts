import {Request,Response} from "express";
import bookService,{BookService} from "../service/bookService.mjs";
import {BookRes} from "../types/book";

class BookControllers {
    private readonly bookService:BookService
    constructor(bookService:BookService) {
        this.bookService=bookService
    }

    getBook = async (req: Request<{ bookId: string }>, res: BookRes): Promise<void> => {
        try {
            const result:BookRes = await this.bookService.getBook(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    addBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.addBook(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    getAllBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.getAllBooks(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    updateBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.updateBook(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    deleteBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.deleteBook(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    bookSearchByTitle = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.bookSearchByTitle(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    bookBorrow = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.bookBorrow(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
                data:result.data
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    bookReturn = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.bookReturn(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
                data:result.data
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    bookAlreadyBorrow = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.bookAlreadyBorrow(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    bookBorrowHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.bookService.bookBorrowHistory(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }
}

export default new BookControllers(bookService)