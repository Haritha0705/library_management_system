import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String }
}, { timestamps: true });

const memberModel = mongoose.model("Member", memberSchema);
export default memberModel;

