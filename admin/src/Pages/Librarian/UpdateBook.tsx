import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from "../../Context/AdminContext.tsx";
import type { SearchModel, SearchResponse } from "../../Models/search.model.ts";
import { searchBookByTitle, updateBook } from "../../Service/book.service.ts";
import { toast } from 'react-toastify';
import type {BookModel} from "../../Models/book.model.ts";

const UpdateBook: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<SearchModel[]>([]);
    const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

    // Book fields
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [availableCopies, setAvailableCopies] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const adminContext = useContext(AdminContext);
    const token = adminContext?.token || "";

    const searchBook = async (value: string) => {
        try {
            if (!token) return;
            const res: SearchResponse = await searchBookByTitle(value, token);
            setResults(res.data || []);
        } catch (e) {
            console.log(e);
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
        setTitle(book.title);
        setAuthor(book.author);
        setCategory(book.category);
        setDescription(book.description);
        setAvailableCopies(book.availableCopies);
        setResults([]);
        setSearch("");
    };

    const handleUpdateBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !selectedBook) return;

        const id = selectedBook._id

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("author", author);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("availableCopies", availableCopies.toString());
            if (imageFile) formData.append("image", imageFile);

            const res = await updateBook(id,token,formData);

            if (res.success) {
                toast.success("Book updated successfully!");
                setSelectedBook(null);
            } else {
                toast.error(res.message || "Failed to update book.");
            }
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
                            Search for a book title to update
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
                            <form
                                onSubmit={handleUpdateBook}
                                className="mt-6 p-6 border rounded-lg shadow space-y-4 bg-white"
                            >
                                <h2 className="text-2xl font-bold">Update Book</h2>

                                {selectedBook.image && (
                                    <img
                                        src={selectedBook.image}
                                        alt={selectedBook.title}
                                        className="w-32 h-40 object-cover rounded"
                                    />
                                )}

                                <div className="flex flex-col space-y-2">
                                    <label>Title</label>
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="input border px-3 py-2 rounded"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Author</label>
                                    <input
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        className="input border px-3 py-2 rounded"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Category</label>
                                    <input
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="input border px-3 py-2 rounded"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Description</label>
                                    <input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="input border px-3 py-2 rounded"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Available Copies</label>
                                    <input
                                        type="number"
                                        value={availableCopies}
                                        onChange={(e) => setAvailableCopies(Number(e.target.value))}
                                        className="input border px-3 py-2 rounded"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>Book Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                                >
                                    Update Book
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UpdateBook;
