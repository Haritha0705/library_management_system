import React from 'react';
import contact_image from "../assets/contact_page.jpeg"

const Contact:React.FC = () => {
    return (
        <div>
            {/* Heading */}
            <div className="text-center text-gray-500 text-2xl pt-10">
                <p>CONTACT <span className="text-gray-700 font-semibold">Us</span></p>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col md:flex-row gap-10 mb-28 text-sm my-10 justify-center items-center">
                <img src={contact_image} alt="Library Contact" className="w-full md:max-w-[360px]" />

                <div className="flex flex-col justify-center items-start gap-6">
                    <p className="font-semibold text-lg text-gray-600">Library Office</p>
                    <p className="text-gray-500">
                        123 Knowledge Street <br /> Suite 200, Colombo, Sri Lanka
                    </p>
                    <p className="text-gray-500">
                        Tel: +94 11 234 5678 <br /> Email: info@librarysystem.com
                    </p>

                    <p className="font-semibold text-lg text-gray-600">Careers at LMS</p>
                    <p className="text-gray-500">
                        Join our team and help us build the future of digital libraries.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Contact;
