import React, {useEffect, useState} from 'react';
import type {ReturnResponse} from "../../Model/return-book.model.ts";
import {checkBookBorrow, returnBookById} from "../../Services/book.Service.ts";
import {toast} from "react-toastify";
import type {BookBorrowResponse} from "../../Model/borrow-book.model.ts";

interface ButtonProps {
    token?:string
    memberId?:string
    bookId?:string
}

const ReturnButton:React.FC<ButtonProps> = ({token,memberId,bookId}) => {
    const[bookReturn,setBookReturn] = useState<boolean>(true)

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

    const BorrowBook = async () => {
        try {
            if (!bookId || !memberId || !token) return;

            const result: BookBorrowResponse = await checkBookBorrow(bookId, memberId, token);

            if (result.success) {
                setBookReturn(false)
            } else {
                setBookReturn(true)
                toast.error(result.message);
            }
        } catch (apiError:any) {
            toast.error(apiError.response?.data?.message || apiError.message || "Failed to borrow book");
            console.error("Error borrowing book:", apiError);
        }
    };
    useEffect(() => {
        BorrowBook()
    }, [bookId, memberId, token]);

    return (
        <button
            className={`px-6 py-2 rounded-lg w-full sm:w-auto transition text-white
            ${bookReturn ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}
            `}
            onClick={handleReturnBook}
            disabled={!bookReturn}
        >
            Return Book
        </button>
    );
};

export default ReturnButton;