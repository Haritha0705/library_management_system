import mongoose from "mongoose";

const librarianSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    joinedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const librarianModel = mongoose.model("Librarian", librarianSchema);
export default librarianModel;
