import React from 'react';
import about_image from "../assets/about_page.jpg"

const About: React.FC = () => {
    return (
        <div>
            {/* Heading */}
            <div className="text-center text-gray-500 text-2xl pt-10">
                <p>About <span className="text-gray-700 font-semibold">Us</span></p>
            </div>

            {/* About Section */}
            <div className="flex flex-col md:flex-row gap-12 my-12">
                <img src={about_image} alt="Library" className="w-full md:max-w-[360px]" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
                    <p>
                        Welcome to our <b>Library Management System</b>, your reliable solution for managing
                        library resources with ease and efficiency. Our system is designed to simplify book
                        borrowing, cataloging, member management, and tracking overdue books.
                    </p>
                    <p>
                        We are committed to providing a modern and user-friendly platform that ensures smooth
                        interaction between librarians, members, and administrators. Whether you are borrowing
                        your first book or managing an entire collection, our LMS supports you every step of
                        the way.
                    </p>
                    <b className="text-gray-800">Our Vision</b>
                    <p>
                        Our vision is to create a seamless digital library experience for everyone. We aim to
                        make knowledge more accessible, bridge the gap between readers and books, and empower
                        institutions to manage their resources effectively.
                    </p>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="text-xl my-4">
                <p className="text-gray-700 font-semibold">WHY <span>CHOOSE US</span></p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Efficiency:</b>
                    <p>Fast and accurate book management with automated cataloging and tracking.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Convenience:</b>
                    <p>Easy access for members to search, borrow, and reserve books online anytime.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Personalization:</b>
                    <p>Tailored book suggestions and notifications to enhance the reading experience.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
