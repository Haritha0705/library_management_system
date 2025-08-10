import mongoose, { Document, Schema } from "mongoose";

export interface IMember extends Document {
    username: string
    email: string
    password: string
}
const memberSchema = new Schema<IMember>({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

const memberModel = mongoose.model<IMember>("Member", memberSchema);
export default memberModel;

