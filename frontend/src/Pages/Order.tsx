import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext.tsx";
import type {BookModel, BookResponse} from "../Model/book.model.ts";
import { toast } from "react-toastify";
import {bookById} from "../Services/book.Service.ts";
import BorrowButton from "../Components/Order Page/BorrowButton.tsx";
import ReturnButton from "../Components/Order Page/ReturnButton.tsx";

const Order: React.FC = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState<BookModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const adminContext = useContext(AppContext);
    if (!adminContext) return null;

    const { token,memberId } = adminContext;

    const fetchBook = async () => {
        try {
            if (!bookId ) return;

            const result: BookResponse = await bookById(bookId);
            if (result.success && result.data) {
                setBook(result.data);
            } else {
                toast.error("Book not found");
                setBook(null);
            }

        } catch (apiError: any) {
            toast.error(apiError.response?.bookData?.message || apiError.message || "Failed to fetch book");
            console.error("Error fetching book:", apiError);
            setBook(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [bookId]);

    const handleBorrow = () => {
        if (book) {
            setBook({ ...book, availableCopies: book.availableCopies - 1 });
        }
    };

    const handleReturn = () => {
        if (book) {
            setBook({ ...book, availableCopies: book.availableCopies + 1 });
        }
    };


    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (!book) {
        return <div className="p-6 text-center text-red-500">Book not found</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <a
                                href="#"
                                className="flex items-center hover:text-blue-600 transition-colors"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Book
                            </a>
                        </li>
                        <li>
                            <svg
                                className="w-3 h-3 text-gray-400 mx-1"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    d="m1 9 4-4-4-4"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        </li>
                        <li className="text-gray-500">{book.title}</li>
                    </ol>
                </nav>

                {/* Book Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-xl shadow-md">
                    {/* Image */}
                    <div className="flex justify-center items-start">
                        <img
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            className="w-full max-w-xs rounded-lg border shadow"
                        />
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                                Description
                            </h2>
                            <p className="text-gray-700 mt-2 leading-relaxed">
                                {book.description}
                            </p>
                        </div>

                        {/* Metadata */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-3">
                                Details
                            </h2>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="w-40 font-medium text-gray-600">Category</span>
                                    <span className="text-gray-800">{book.category}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="w-40 font-medium text-gray-600">
                                      Availability
                                    </span>
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                            book.availableCopies > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                    {book.availableCopies > 0
                                    ? "Available"
                                    : "Not Available"}
                                    </span>
                                </div>
                                {book.availableCopies > 0 && (
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="w-40 font-medium text-gray-600">Book Count</span>
                                        <span className="text-gray-800">{book.availableCopies}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {token && (
                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                {book.availableCopies > 0 && (
                                    <BorrowButton token={token}
                                                  memberId={memberId}
                                                  bookId={bookId}
                                                  onBorrow={handleBorrow}
                                    />
                                )}
                                <ReturnButton
                                    token={token}
                                    memberId={memberId}
                                    bookId={bookId}
                                    onReturn={handleReturn}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Order;
