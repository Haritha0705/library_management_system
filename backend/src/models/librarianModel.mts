import mongoose, {Document, Schema, Types} from "mongoose";

export interface ILibrarian extends Document{
    username: string
    email: string
    password: string
    profile:Types.ObjectId
}

const librarianSchema = new Schema<ILibrarian>({
    profile: { type: Schema.Types.ObjectId, ref: "LibrarianProfile" },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

const librarianModel = mongoose.model<ILibrarian>("Librarian", librarianSchema);
export default librarianModel;
