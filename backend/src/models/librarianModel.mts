import mongoose, { Document, Schema } from "mongoose";

export interface ILibrarian extends Document{
    name: string
    email: string
    password: string
    image?: string
    phone?: string
    address?: string
}


const librarianSchema = new Schema<ILibrarian>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
}, { timestamps: true });

const librarianModel = mongoose.model<ILibrarian>("Librarian", librarianSchema);
export default librarianModel;
