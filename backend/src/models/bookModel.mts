import mongoose, { Schema, Document, model } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    category: string;
    description: string;
    publisher: string;
    publishYear: number;
    quantity: number;
    available: number;
    addedBy: mongoose.Types.ObjectId;
}

const bookSchema:Schema<IBook> = new mongoose.Schema(
    {
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{type:String,required:true},
    category:{type:String,required:true},
    description: { type: String,required:true },
    publisher: { type: String,required:true },
    publishYear: { type: Number,required:true },
    quantity:{type:Number,required:true},
    available:{type:Number,required:true},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Librarian", required: true }
},{ timestamps: true })

const BookModel = model<IBook>('Book',bookSchema)
export default BookModel
