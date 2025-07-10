import mongoose, { Document, Schema } from "mongoose";

export interface IIssue extends Document {
    bookId: mongoose.Types.ObjectId;
    memberId: mongoose.Types.ObjectId;
    issueDate: Date;
    returnDate: Date;
    status: 'issued' | 'returned' | 'overdue';
}

const issueSchema = new Schema<IIssue>(
    {
        memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
        bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
        issueDate: { type: Date, default: Date.now },
        returnDate: Date,
        status: {
            type: String,
            enum: ['issued', 'returned', 'overdue'],
            default: 'issued',
            required: true
        },
    },
    { timestamps: true }
);

const Issue = mongoose.model<IIssue>("Issue", issueSchema);
export default Issue;
