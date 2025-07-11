import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { books } from "../assets/assets.ts";

interface Book {
    _id: string;
    name: string;
    image: string;
    category: string;
    author: string;
    des: string;
    publication_Date: string;
    ISBN: string;
    availability: string;
}

const Order: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [bookInfo, setBookInfo] = useState<Book | null>(null);

    useEffect(() => {
        if (!books || books.length === 0) return;
        const foundBook = books.find(book => book._id === bookId);
        if (foundBook) {
            setBookInfo(foundBook);
        } else {
            console.warn("Book not found with id:", bookId);
        }
    }, [bookId]);

    if (!bookInfo) return <p className="text-center mt-10 text-gray-600">Loading or Book not found...</p>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <a href="#" className="flex items-center hover:text-blue-600 transition-colors">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Order
                            </a>
                        </li>
                        <li>
                            <svg className="w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
                                <path d="m1 9 4-4-4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </li>
                        <li className="text-gray-500">{bookInfo.name}</li>
                    </ol>
                </nav>

                {/* Book Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-6 rounded-xl shadow-md">
                    {/* Image */}
                    <div className="flex justify-center items-start">
                        <img
                            src={bookInfo.image}
                            alt={`Cover of ${bookInfo.name}`}
                            className="w-full max-w-xs rounded-lg border shadow"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/300x450/dce8f3/333333?text=Book+Cover';
                            }}
                        />
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{bookInfo.name}</h1>
                            <p className="text-lg text-gray-600 mt-1">by {bookInfo.author}</p>
                        </div>

                        {/* Synopsis */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Synopsis</h2>
                            <p className="text-gray-700 mt-2 leading-relaxed">{bookInfo.des}</p>
                        </div>

                        {/* Metadata */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-3">Details</h2>
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="w-40 font-medium text-gray-600">Genre</span>
                                    <span className="text-gray-800">{bookInfo.category}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="w-40 font-medium text-gray-600">Publication Date</span>
                                    <span className="text-gray-800">{bookInfo.publication_Date}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="w-40 font-medium text-gray-600">ISBN</span>
                                    <span className="text-gray-800">{bookInfo.ISBN}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <span className="w-40 font-medium text-gray-600">Availability</span>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bookInfo.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {bookInfo.availability}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full sm:w-auto">
                                Check Out
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition w-full sm:w-auto">
                                Edit Information
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Order;
