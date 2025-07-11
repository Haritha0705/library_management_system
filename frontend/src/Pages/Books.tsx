import React, { useEffect, useState } from 'react';
import { books } from "../assets/assets.ts";
import { useNavigate } from "react-router-dom";

const Books: React.FC = () => {
    const [searchVal, setSearchVal] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);

    const navigate = useNavigate();

    useEffect(() => {
        const lowercasedSearchTerm = searchVal.toLowerCase();
        const currentFilteredBooks = books.filter(book =>
            book.name.toLowerCase().includes(lowercasedSearchTerm) ||
            book.author.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredBooks(currentFilteredBooks);
    }, [searchVal]); // Removed `books` since it's a static import

    const searchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchVal(e.target.value);
    };

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
                                onChange={searchBooks}
                                value={searchVal}
                                type="search"
                                className="input w-full pl-10 pr-4 py-3"
                                placeholder="Search by title, author, or keyword..."
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-sm font-medium text-[var(--text-secondary)]">Filter by:</span>
                            {["Title", "Author", "Genre", "Availability"].map(filter => (
                                <button key={filter} className="button_secondary flex items-center gap-1 text-sm">
                                    {filter}
                                    <svg fill="currentColor" height="16" width="16" viewBox="0 0 256 256">
                                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                                    </svg>
                                </button>
                            ))}
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
                                    alt={`Book cover for ${book.name}`}
                                    className="aspect-[3/4] w-full object-cover bg-gray-100"
                                />
                                <div className="p-4 flex flex-1 flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{book.name}</h3>
                                    <p className="text-sm text-gray-500">{book.author}</p>
                                    <p className="text-sm text-gray-600 flex-1 line-clamp-3">{book.des}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                            book.availability === 'Available'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>{book.availability}</span>
                                        <p className="text-blue-600 text-sm font-medium hover:underline">Count 10</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination - kept as-is */}
                    <div className="mt-12 flex items-center justify-center">
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                            <a className="relative inline-flex items-center rounded-l-md px-2 py-2 text-[var(--text-secondary)] ring-1 ring-inset ring-gray-300 hover:bg-[var(--secondary-color)]" href="#">
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
                                </svg>
                            </a>
                            <a className="bg-[var(--accent-color)] text-[var(--primary-color)] px-4 py-2 text-sm font-semibold" href="#">1</a>
                            <a className="px-4 py-2 text-sm font-semibold text-[var(--text-primary)] ring-1 ring-inset ring-gray-300" href="#">2</a>
                            <a className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-[var(--text-primary)] ring-1 ring-inset ring-gray-300" href="#">3</a>
                            <span className="px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>
                            <a className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-[var(--text-primary)] ring-1 ring-inset ring-gray-300" href="#">8</a>
                            <a className="px-4 py-2 text-sm font-semibold text-[var(--text-primary)] ring-1 ring-inset ring-gray-300" href="#">9</a>
                            <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-[var(--text-secondary)] ring-1 ring-inset ring-gray-300 hover:bg-[var(--secondary-color)]" href="#">
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06.02z" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Books;
