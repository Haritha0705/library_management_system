import mongoose, { Schema, Document, model } from "mongoose";

// 1. Interface
export interface Order extends Document {
    memberId: string;
    bookId: string;
    getDate: string;
    getTime: string;
    bookData: any;
    isReturn: boolean;
    addedBy: mongoose.Types.ObjectId;
}

// 2. Schema
const orderSchema: Schema<Order> = new Schema(
    {
        memberId: { type: String, required: true },
        bookId: { type: String, required: true },
        getDate: { type: String, required: true },
        getTime: { type: String, required: true },
        bookData: { type: Object, required: true },
        isReturn: { type: Boolean, required: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Librarian", required: true },
    },
    { timestamps: true }
);

// 3. Model
const OrderModel = model<Order>("Order", orderSchema);

export default OrderModel;
