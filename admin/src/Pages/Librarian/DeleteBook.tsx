import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext.tsx";
import type { SearchResponse } from "../../Models/search.model.ts";
import { searchBookByTitle, deleteBook as deleteBookService } from "../../Service/book.service.ts";
import { toast } from "react-toastify";
import type {BookModel} from "../../Models/book.model.ts";

const DeleteBook: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<BookModel[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

    const adminContext = useContext(AdminContext);
    const token = adminContext?.token || "";

    const searchBook = async (value: string) => {
        try {
            if (!token) return;
            const res: SearchResponse = await searchBookByTitle(value, token);
            setResults(res.data || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (search.length <= 1) {
            setResults([]);
            return;
        }

        const timeOut = setTimeout(() => {
            searchBook(search);
        }, 300);

        return () => clearTimeout(timeOut);
    }, [search]);

    const handleSelectBook = (book: BookModel) => {
        setSelectedBook(book);
        setResults([]);
        setSearch("");
    };

    const handleDeleteBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !selectedBook) return;

        const id = selectedBook._id;

        try {
            await deleteBookService(id, token);
            toast.success("Book deleted successfully!");
            setSelectedBook(null);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Something went wrong.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col font-sans antialiased w-full">
            <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 text-center">
                        <p className="mt-3 text-lg text-[var(--text-secondary)]">
                            Search for a book title to delete
                        </p>
                    </div>

                    <div className="mb-8 space-y-6">
                        <div className="relative">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                type="search"
                                className="input w-full pl-10 pr-4 py-3 shadow-xl border rounded-2xl"
                                placeholder="Search by title"
                            />

                            {results.length > 0 && (
                                <ul className="absolute bg-white w-full mt-1 border rounded shadow z-10 max-h-145 overflow-y-auto">
                                    {results.map((book, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xl font-semibold flex items-center gap-8"
                                            onClick={() => handleSelectBook(book)}
                                        >
                                            {book.image && (
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="w-14 h-20 object-cover rounded"
                                                />
                                            )}
                                            {book.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {selectedBook && (
                            <div className="flex items-center justify-between bg-white px-6 py-6 rounded-lg shadow-md border border-gray-200">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={selectedBook.image}
                                        alt={selectedBook.title}
                                        className="w-20 h-28 object-cover rounded-md shadow-sm"
                                    />
                                    <p className="text-lg font-semibold text-gray-700">{selectedBook.title}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleDeleteBook}
                                    className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
                                >
                                    Delete Book
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default DeleteBook;
