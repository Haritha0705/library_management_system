import React from 'react';
import {borrowBookById} from "../../Services/book.Service.ts";
import {toast} from "react-toastify";
import type { BorrowResponse} from "../../Model/borrow-book.model.ts";

interface ButtonProps {
    token?:string
    memberId?:string
    bookId?:string
}
const BorrowButton:React.FC<ButtonProps> = ({token,memberId,bookId}) => {
    // const [borrow,setBorrow] = useState<boolean>(false)

    const handleBorrowBook = async () => {
        try {
            if (!bookId || !memberId || !token) return;

            const result: BorrowResponse = await borrowBookById(bookId, memberId, token);

            if (result.success) {
                // setBorrow(false)
                toast.success(result.message || "Book borrowed successfully");
            } else {
                toast.error(result.message || "Failed to borrow book");
            }
        } catch (apiError:any) {
            toast.error(apiError.response?.data?.message || apiError.message || "Failed to borrow book");
            console.error("Error borrowing book:", apiError);
        }
    };

    // const BorrowBook = async () => {
    //     try {
    //         if (!bookId || !memberId || !token) return;
    //
    //         const result: BookBorrowResponse = await checkBookBorrow(bookId, memberId, token);
    //
    //         if (result.success) {
    //             setBorrow(true)
    //         } else {
    //             setBorrow(false)
    //             toast.error(result.message);
    //         }
    //     } catch (apiError:any) {
    //         toast.error(apiError.response?.data?.message || apiError.message || "Failed to borrow book");
    //         console.error("Error borrowing book:", apiError);
    //     }
    // };
    // useEffect(() => {
    //     BorrowBook()
    // }, [bookId, memberId, token]);

    return (
         <button
             className={`px-6 py-2 rounded-lg w-full sm:w-auto transition text-white bg-blue-600 hover:bg-blue-700 cursor-pointer
      `}
        // ${borrow ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}
             onClick={handleBorrowBook}
             // disabled={!borrow}
         >Borrow Book
         </button>
    );
};

export default BorrowButton;