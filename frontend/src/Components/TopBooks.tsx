import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { books } from "../assets/assets.ts";
import { Heart, Star } from "lucide-react";

const TopBooks: React.FC = () => {
    const navigate = useNavigate();
    const [favBooks, setFavBooks] = useState<string[]>([]);

    const toggleFavorite = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setFavBooks(prev =>
            prev.includes(id) ? prev.filter(bookId => bookId !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col items-center gap-6 text-gray-900 my-16 px-4 md:px-10">
            <h1 className="text-3xl font-semibold">Top Books to Buy</h1>
            <p className="text-center text-sm sm:w-1/2 text-gray-600">
                Simply browse through our extensive collection of bestselling and beloved books.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6">
                {books.slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/order/${item._id}`)}
                        className="relative border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-md transition-all duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-96 object-cover bg-blue-50"
                        />

                        {/* Heart Favorite Icon */}
                        <Heart
                            onClick={(e) => toggleFavorite(item._id, e)}
                            size={32}
                            className={`absolute right-4 top-4 p-1.5 rounded-full cursor-pointer transition-colors duration-300 ${
                                favBooks.includes(item._id)
                                    ? 'fill-red-500 text-red-500 bg-white'
                                    : 'bg-white text-gray-400'
                            }`}
                        />

                        <div className="p-4 flex flex-col items-start gap-2">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2 px-3 py-1 bg-primary rounded-full">
                                    <Star className="fill-yellow-500 text-yellow-500" size={16} />
                                    <span className="text-white text-sm">4.5</span>
                                </div>
                                <p className="text-xs text-gray-500">140 Reviews</p>
                            </div>

                            <p className="text-lg font-medium">{item.name}</p>
                            <p className="text-gray-500 text-sm">{item.category}</p>

                            <button className="mt-2 w-full bg-black text-white py-2 px-4 rounded-full hover:opacity-90">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate("/books");
                    scrollTo(0, 0);
                }}
                className="bg-blue-50 text-gray-600 rounded-full px-12 py-3 mt-10 hover:bg-blue-100 transition"
            >
                More
            </button>
        </div>
    );
};

export default TopBooks;
