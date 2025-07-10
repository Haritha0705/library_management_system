import mongoose, { Schema, Document, model } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    category: string;
    description:string,
    availableCopies: number;
}

const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: String,
        category: String,
        description:String,
        availableCopies: { type: Number, default: 1 },
},{ timestamps: true })

const BookModel = model<IBook>('Book',bookSchema)
export default BookModel
