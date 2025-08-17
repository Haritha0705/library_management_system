import React from 'react';
import {borrowBookById} from "../../Services/book.Service.ts";
import {toast} from "react-toastify";

interface ButtonProps {
    token:string
    memberId:string
    bookId:string
}
const BorrowButton:React.FC<ButtonProps> = ({token,memberId,bookId}) => {

    const handleBorrowBook = async () => {
        try {
            if (!bookId || !memberId || !token) return;

            const result: BorrowResponse = await borrowBookById(bookId, memberId, token);

            if (result.success) {
                toast.success(result.message || "Book borrowed successfully");
            } else {
                toast.error(result.message || "Failed to borrow book");
            }
        } catch (apiError: any) {
            toast.error(apiError.response?.data?.message || apiError.message || "Failed to borrow book");
            console.error("Error borrowing book:", apiError);
        }
    };

    return (
        <button
            className={`px-6 py-2 rounded-lg w-full sm:w-auto transition bg-blue-600 hover:bg-blue-700 text-white cursor-pointer`}
            onClick={handleBorrowBook}
        >Borrow Book
        </button>
    );
};

export default BorrowButton;