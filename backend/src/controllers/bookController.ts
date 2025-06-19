import { Request, Response } from 'express';
import Book from '../models/bookModel';

export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.find();
    res.json(books)
}

export const addBook = async (req: Request, res: Response) => {
    const book = await Book.find();
    res.status(201).json(book)
}