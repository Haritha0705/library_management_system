import mongoose, { Schema, Document, model } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    category: string;
    image?: string;
    description:string;
    availableCopies: number;
}

const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        category: { type: String, required: true },
        description:{ type: String, required: true },
        image:{ type: String, required: true },
        availableCopies: { type: Number, default: 1 },
},{ timestamps: true })

const BookModel = mongoose.model<IBook>('Book',bookSchema)
export default BookModel
