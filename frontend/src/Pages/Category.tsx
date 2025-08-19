import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {AdminContext} from "../Context/AdminProvider.tsx";


const Category: React.FC = () => {
    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { books,loading } = adminContext;

    const { category } = useParams<{ category: string }>();

    const filteredBooks = books.filter((b) => b.category === category);

    if (loading) {
        return <div className="p-4 text-gray-600 text-center text-xl">Loading Books...</div>;
    }

    if (filteredBooks.length === 0) {
        return <div className="p-4 text-gray-600 text-center text-xl">No Books</div>;
    }

    return (
        <div className="flex min-h-screen flex-col font-sans antialiased">
            <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">{category} Books</h1>
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

export default Category;