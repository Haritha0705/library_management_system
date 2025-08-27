import React from 'react';
import type { ReturnResponse} from "../../Model/return-book.model.ts";
import { returnBookById} from "../../Services/book.Service.ts";
import {toast} from "react-toastify";

interface ButtonProps {
    token?:string
    memberId?:string
    bookId?:string
}

const ReturnButton:React.FC<ButtonProps> = ({token,memberId,bookId}) => {

    const handleReturnBook = async () => {
        try {
            if (!bookId || !memberId || !token) return;

            const result: ReturnResponse = await returnBookById(bookId, memberId, token);

            if (result.success) {
                toast.success(result.message || "Book return successfully");
            } else {
                toast.error(result.message || "Failed to return book");
            }
        } catch (apiError: any) {
            toast.error(apiError.response?.data?.message || apiError.message || "Failed to return book");
            console.error("Error returning book:", apiError);
        }
    };

    return (
        <button
            className={`px-6 py-2 rounded-lg w-full sm:w-auto transition text-white bg-blue-600 hover:bg-blue-700 cursor-pointe
            `}
            onClick={handleReturnBook}
        >
            Return Book
        </button>
    );
};

export default ReturnButton;