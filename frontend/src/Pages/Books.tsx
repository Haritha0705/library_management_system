import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {AdminContext} from "../Context/AdminProvider.tsx";
import {toast} from "react-toastify";
import type {BookModel, BooksResponse} from "../Model/book.model.ts";
import { getAllBooks} from "../Services/book.Service.ts";
import SearchBar from "../Components/Books page/SearchBar.tsx";
// import Filter from "../Model/Filter.tsx";

const Books: React.FC = () => {
    const [book,setBook] = useState<BookModel[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [selectedAuthor, setSelectedAuthor] = useState<string>("");

    const navigate = useNavigate();

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { token } = adminContext;

    const fetchBooks = async ()=>{
        try {
            const res: BooksResponse = await getAllBooks(token);
            setBook(res.data);
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

    const uniqueAuthors = Array.from(new Set(book.map((b) => b.author)));

    // Filter books by selected author
    const filteredBooks = selectedAuthor === "" ? book : book.filter((b) => b.author === selectedAuthor);

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
                        <SearchBar />
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-sm font-medium">Filter by:</span>
                            <select
                                value={selectedAuthor}
                                onChange={(e) => setSelectedAuthor(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="">All Authors</option>
                                {uniqueAuthors.map((author, index) => (
                                    <option key={index} value={author}>
                                        {author}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 py-6">
                        {filteredBooks.map((book, index) => (
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
                                        {book.availableCopies > 0 ? 'Available' : 'Not Available'}
                                        </span>
                                        {book.availableCopies > 0 && (
                                            <p className="text-blue-600 text-sm font-medium hover:underline">Count {book.availableCopies}</p>
                                        )}
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
