import mongoose, { Document, Schema , Types} from "mongoose";

export interface IMember extends Document {
    username: string
    email: string
    password: string
    profile:Types.ObjectId
}
const memberSchema = new Schema<IMember>({
    profile: { type: Schema.Types.ObjectId, ref: "MemberProfile" },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

const memberModel = mongoose.model<IMember>("Member", memberSchema);
export default memberModel;

