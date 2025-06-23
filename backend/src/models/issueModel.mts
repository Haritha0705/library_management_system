import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, enum: ['issued', 'returned', 'overdue'], default: 'issued' }
}, { timestamps: true });

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
