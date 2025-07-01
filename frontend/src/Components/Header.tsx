import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.ts';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row bg-primary rounded-lg overflow-hidden px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
            {/* Left Side */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 text-white">
                <div className="text-xl sm:text-2xl lg:text-5xl text-white font-semibold">
                    <p>Find Your Next Read</p>
                    <p className="mt-4">Explore 10,000+ Books Across All Genres</p>
                </div>
                <p className="mt-4 text-sm sm:text-base text-white/80">
                    Browse our massive collection of fiction, non-fiction, educational books, and more.
                    <br className="hidden sm:block" />
                    Start your reading journey today with just a click.
                </p>
                <button
                    onClick={() => {
                        navigate('/books');
                        scrollTo(0, 0);
                    }}
                    className="bg-white text-sm sm:text-base text-gray-700 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-transform duration-200"
                >
                    Explore Books
                </button>
            </div>

            {/* Right Side */}
            <div className="flex justify-center items-end w-full lg:w-[50%] mt-10 lg:mt-0">
                <img className="w-full max-w-md h-auto rounded-lg" src={assets.bookWithGirl} alt="Book with Girl"/>
            </div>
        </div>
    );
};

export default Header;
