import React, { useContext, useState } from 'react';
import { AdminContext } from "../../Context/AdminProvider.tsx";
import { toast } from "react-toastify";
import { addBook } from "../../Service/submit-form.service.ts";
import uploadImg from "../../assets/upload_area.svg";

const AddBook: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [availableCopies, setAvailableCopies] = useState("");

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;
    const { token } = adminContext;

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) {
            return toast.error("Image Not Selected");
        }

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("title", title);
            formData.append("author", author);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("availableCopies", availableCopies);

            const dataRes = await addBook(formData, token);

            if (dataRes && dataRes.success) {
                toast.success(dataRes.message || "Book added successfully!");
                setImage(null);
                setTitle("");
                setAuthor("");
                setCategory("");
                setDescription("");
                setAvailableCopies("");
            } else {
                toast.error(dataRes?.message || "Something went wrong!");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="mx-auto my-5 w-full max-w-4xl">
            <p className="mb-6 text-2xl font-semibold text-gray-800">Add Book</p>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-h-[80vh] overflow-y-auto">
                {/* Upload Image */}
                <div className="flex items-center gap-5 mb-8 text-gray-700">
                    <label htmlFor="lib-img" className="cursor-pointer">
                        <img
                            className="w-20 h-20 object-cover bg-gray-100 rounded-full border border-gray-300"
                            src={image ? URL.createObjectURL(image) : uploadImg}
                            alt="Upload Librarian"
                        />
                    </label>
                    <input
                        onChange={(e) => e.target.files && setImage(e.target.files[0])}
                        type="file"
                        id="lib-img"
                        hidden
                    />
                    <p className="text-lg font-medium">
                        Upload Book
                        <br />
                        Picture
                    </p>
                </div>

                {/* Form Sections */}
                <div className="flex flex-col gap-10 lg:flex-row text-gray-700">
                    {/* Left Section */}
                    <div className="w-full lg:flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Title</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter Title"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Author</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter Author"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setAuthor(e.target.value)}
                                value={author}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Category</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter Category"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Description</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter Description"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">AvailableCopies</label>
                            <input
                                type="number"
                                required
                                placeholder="Enter AvailableCopies"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setAvailableCopies(e.target.value)}
                                value={availableCopies}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="cursor-pointer mt-8 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Add Book
                </button>
            </div>
        </form>
    );
};

export default AddBook;
