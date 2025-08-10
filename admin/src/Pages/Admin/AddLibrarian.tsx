import React, { useContext, useState } from 'react';
import { toast } from "react-toastify";
import uploadImg from "../../assets/upload_area.svg";
import { addLibrarian } from "../../Service/submit-form.service";
import {AdminContext} from "../../Context/AdminProvider.tsx";

const AddLibrarian: React.FC = () => {
    const [libImg, setLibImg] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const adminContext = useContext(AdminContext);

    if (!adminContext) return null

    const { token } = adminContext;

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!libImg){
                return toast.error("Image Not Selected")
            }

            const formData = new FormData();
            formData.append("image", libImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("address", address);
            formData.append("phone", phone);

            const data = await addLibrarian(formData, token);

            if (data && data.success){
                toast.success(data.message || "Librarian added successfully!");
                setLibImg(null);
                setName("");
                setEmail("");
                setPassword("");
                setAddress("");
                setPhone("");
            }else {
                toast.error(data?.message || "Something went wrong!");
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-4 text-xl font-semibold text-gray-700">Add Librarian</p>

            <div className="bg-white p-6 border rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-md">
                {/* Upload Image */}
                <div className="flex items-center gap-4 mb-6 text-gray-600">
                    <label htmlFor="lib-img" className="cursor-pointer">
                        <img
                            className="w-16 h-16 object-cover bg-gray-100 rounded-full"
                            src={libImg ? URL.createObjectURL(libImg) : uploadImg}
                            alt="Upload"
                        />
                    </label>
                    <input
                        onChange={(e) => e.target.files && setLibImg(e.target.files[0])}
                        type="file"
                        id="lib-img"
                        hidden
                    />
                    <p>Upload Librarian<br />Picture</p>
                </div>

                {/* Form Sections */}
                <div className="flex flex-col gap-10 lg:flex-row text-gray-700">
                    {/* Left Section */}
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Name"
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Address</label>
                            <input
                                type="text"
                                required
                                placeholder="Address"
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Phone</label>
                            <input
                                type="text"
                                required
                                placeholder="Phone Number"
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="cursor-pointer mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                    Add Librarian
                </button>
            </div>
        </form>
    );
};

export default AddLibrarian;
