import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {AppContext} from "../../Context/AppContext.tsx";

const TopBooks: React.FC = () => {
    const navigate = useNavigate();

    const adminContext = useContext(AppContext);

    if (!adminContext) return null

    const { books } = adminContext;

    return (
        <div className="flex flex-col items-center gap-6 text-gray-900 my-16 px-4 md:px-10">
            <h1 className="text-3xl font-semibold">Top Books to Buy</h1>
            <p className="text-center text-sm sm:w-1/2 text-gray-600">
                Simply browse through our extensive collection of bestselling and beloved books.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-6">
                {[...books].sort(()=>Math.random()-0.5).slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/order/${item._id}`)}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-md transition-all duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-96 object-cover bg-blue-50"
                        />
                        <div className="p-4 flex flex-col items-start gap-2">
                            <p className="text-lg font-medium">{item.title}</p>
                            <p className="text-gray-500 text-sm">{item.category}</p>
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
