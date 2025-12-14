import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import uploadImg from "../../assets/upload_area.svg";
import { addLibrarian } from "../../Service/submit-form.service";
import { AdminContext } from "../../Context/AdminContext.tsx";

const AddLibrarian: React.FC = () => {
    const [libImg, setLibImg] = useState<File | null>(null);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;
    const { token } = adminContext;

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!libImg) {
            return toast.error("Image Not Selected");
        }

        try {
            const formData = new FormData();
            formData.append("image", libImg);
            formData.append("username", username);
            formData.append("full_name", fullName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("address", address);
            formData.append("phone", phone);

            const data = await addLibrarian(formData, token);

            if (data && data.success) {
                toast.success(data.message || "DashBoard added successfully!");
                setLibImg(null);
                setUsername("");
                setFullName("");
                setEmail("");
                setPassword("");
                setAddress("");
                setPhone("");
            } else {
                toast.error(data?.message || "Something went wrong!");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="mx-auto my-5 w-full max-w-4xl">
            <p className="mb-6 text-2xl font-semibold text-gray-800">Add Librarian</p>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-h-[80vh] overflow-y-auto">
                {/* Upload Image */}
                <div className="flex items-center gap-5 mb-8 text-gray-700">
                    <label htmlFor="lib-img" className="cursor-pointer">
                        <img
                            className="w-20 h-20 object-cover bg-gray-100 rounded-full border border-gray-300"
                            src={libImg ? URL.createObjectURL(libImg) : uploadImg}
                            alt="Upload Librarian"
                        />
                    </label>
                    <input
                        onChange={(e) => e.target.files && setLibImg(e.target.files[0])}
                        type="file"
                        id="lib-img"
                        hidden
                    />
                    <p className="text-lg font-medium">
                        Upload Librarian
                        <br />
                        Picture
                    </p>
                </div>

                {/* Form Sections */}
                <div className="flex flex-col gap-10 lg:flex-row text-gray-700">
                    {/* Left Section */}
                    <div className="w-full lg:flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Username</label>
                            <input
                                type="text"
                                required
                                placeholder="Username"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Full Name"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Address</label>
                            <input
                                type="text"
                                required
                                placeholder="Address"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Phone</label>
                            <input
                                type="text"
                                required
                                placeholder="Phone Number"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="cursor-pointer mt-8 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Add Librarian
                </button>
            </div>
        </form>
    );
};

export default AddLibrarian;
