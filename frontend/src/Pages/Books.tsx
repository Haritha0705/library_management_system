import React, {useContext, useEffect, useState} from 'react';
import { books } from "../assets/assets.ts";
import { useNavigate } from "react-router-dom";
import {AdminContext} from "../Context/AdminProvider.tsx";
import {toast} from "react-toastify";
import type {BookModel, BookResponse} from "../Model/book.model.ts";
import {getAllBooks} from "../Services/book.Service.ts";

const Books: React.FC = () => {
    const [book,setBook] = useState<BookModel[]>([])
    const [loading,setLoading] = useState<boolean>(true)


    const navigate = useNavigate();

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { token } = adminContext;

    const fetchBooks = async ()=>{
        try {
            const res: BookResponse = await getAllBooks(token);
            setBook(res.data);
            console.log(res.data)
        }catch (apiError: any) {
            toast.error(apiError.message || "Failed to fetch librarians");
            console.error("Error fetching librarians:", apiError);
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        fetchBooks()
    }, [token]);

    if (loading) {
        return <div className="p-4 text-gray-600">Loading Books...</div>;
    }

    if (book.length === 0) {
        return <div className="p-4 text-gray-600">No Books</div>;
    }


    return (
        <div className="flex min-h-screen flex-col font-sans antialiased">
            <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">All Books</h1>
                        <p className="mt-3 text-lg text-[var(--text-secondary)]">
                            Explore our vast collection of books and find your next great read.
                        </p>
                    </div>

                    <div className="mb-8 space-y-6">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            <input
                                // onChange={}
                                // value={}
                                type="search"
                                className="input w-full pl-10 pr-4 py-3"
                                placeholder="Search by title, author, or keyword..."
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-sm font-medium">Filter by:</span>
                            <select
                                // onChange={handleChange} value={selectedAuthor}
                            >
                                <option value="">Author</option>
                                {books.map((book) => (
                                    <option key={book._id} value={book.author}>
                                        {book.author}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 py-6">
                        {book.map((book, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/order/${book._id}`)}
                                className="flex flex-col cursor-pointer rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 bg-white"
                            >
                                <img
                                    src={book.image}
                                    alt={`Book cover for ${book.title}`}
                                    className="aspect-[3/4] w-full object-cover bg-gray-100"
                                />
                                <div className="p-4 flex flex-1 flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                                    <p className="text-sm text-gray-500">{book.author}</p>
                                    <p className="text-sm text-gray-600 flex-1 line-clamp-3">{book.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                                book.availableCopies > 0
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                        {book.availableCopies > 0 ? 'Available' : 'Not Available'})
                                        </span>

                                        <p className="text-blue-600 text-sm font-medium hover:underline">Count {book.availableCopies}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Books;
