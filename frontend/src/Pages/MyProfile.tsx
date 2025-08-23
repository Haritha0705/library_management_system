import React, { useContext, useEffect, useState } from "react";
import userimg from "../assets/userIcon.png";
import type {UserDeleteResponse, UserModel, UserResponse} from "../Model/user.model.ts";
import { AppContext } from "../Context/AppContext.tsx";
import {deleteProfile, getProfile, updateProfile} from "../Services/user.Service.ts";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import {useNavigate} from "react-router-dom";

const MyProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<{
        full_name: string;
        imageFile: File | null;
        phone: string;
        address: string;
    }>({
        full_name: "",
        imageFile: null,
        phone: "",
        address: "",
    });

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const navigate = useNavigate();

    const adminContext = useContext(AppContext);
    if (!adminContext) return null;

    const { token, memberId } = adminContext;

    useEffect(() => {
        if (!token || !memberId) {
            setLoading(false);
            return;
        }
        const getUser = async () => {
            try {
                const res: UserResponse = await getProfile(memberId, token);
                setProfile(res.data);
                setUserData({
                    full_name: res.data?.full_name || "",
                    phone: res.data?.phone || "",
                    address: res.data?.address || "",
                    imageFile: null,
                });
            } catch (apiError: any) {
                toast.error(apiError.message || "Failed to fetch member profile");
                console.error("Error fetching member profile:", apiError);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [token, memberId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token || !memberId) return;

        try {
            const formData = new FormData();
            formData.append("full_name", userData.full_name || "");
            formData.append("phone", userData.phone || "");
            formData.append("address", userData.address || "");

            if (userData.imageFile) {
                formData.append("image", userData.imageFile);
            }

            const res = await updateProfile(memberId, token, formData);
            if (res.success) {
                toast.success("Profile updated successfully");
                setProfile(res.updatedProfile);
                setIsEdit(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update user data.");
        }
    };

    const formatDate = (iso?: string) => {
        if (!iso) return "";
        const d = new Date(iso);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        return `${year}/${month}/${day} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
    };

    const deleteMember = async () => {
        if (!token || !memberId) return;
        try {
            const res: UserDeleteResponse = await deleteProfile(memberId, token);
            toast.success(res.message)
        } catch (apiError: any) {
            toast.error(apiError.message || "Failed to fetch member profile");
            console.error("Error fetching member profile:", apiError);
        }
    }

    if (loading) {
    return (
        <div className="h-screen flex items-center justify-center text-lg text-gray-600">
            Loading profile...
        </div>
        );
    }

    if (!profile) {
        return (
            <div className="h-screen flex items-center justify-center text-lg text-gray-600">
                No profile found
            </div>
        );
    }

    return (
        <div className="flex flex-col max-w-lg gap-2 text-sm">
            {/* Profile Image */}
            {isEdit ? (
                <div className="flex mt-4">
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setUserData((prev) => ({
                                        ...prev,
                                        imageFile: e.target.files![0],
                                    }));
                                }
                            }}
                        />
                        <div className="relative">
                            <img
                                src={
                                    userData.imageFile
                                        ? URL.createObjectURL(userData.imageFile)
                                        : profile.image?.startsWith("http")
                                            ? profile.image
                                            : userimg
                                }
                                alt={profile.full_name || "User"}
                                className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-md mt-4"
                            />
                            <div className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full shadow">
                                <FiEdit2 />
                            </div>
                        </div>
                    </label>
                </div>
            ) : (
                <img
                    src={
                        userData.imageFile
                            ? URL.createObjectURL(userData.imageFile)
                            : profile.image?.startsWith("http")
                                ? profile.image
                                : userimg
                    }
                    alt={profile.full_name || "User"}
                    className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-md mt-4"
                />
            )}

            {/* Username */}
            <p className="font-medium text-3xl text-neutral-800 mt-4">
                {profile.username || profile.full_name}
            </p>

            <div className="flex items-center gap-5 text-xl">
                <label>Status :</label>
                <p className="font-medium text-xl text-neutral-800">{profile.status}</p>
            </div>

            <hr />

            {/* Contact Info */}
            <div>
                <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Email:</p>
                    <p className="text-gray-500">{profile.email}</p>

                    <p className="font-medium">Full Name :</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 max-w-52"
                            type="text"
                            value={userData.full_name}
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, full_name: e.target.value }))
                            }
                        />
                    ) : (
                        <p className="text-gray-500">{profile.full_name}</p>
                    )}

                    <p className="font-medium">Phone :</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 max-w-52"
                            type="text"
                            value={userData.phone}
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                        />
                    ) : (
                        <p className="text-gray-500">{profile.phone}</p>
                    )}
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <p className="text-neutral-500 underline mt-3 font-semibold">
                    BASIC INFORMATION
                </p>
                <div className="grid grid-cols-2 gap-y-3 mt-4 text-neutral-700">
                    <p className="font-medium">Address :</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 border rounded-md px-2 py-1 w-full max-w-xs"
                            type="text"
                            value={userData.address}
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, address: e.target.value }))
                            }
                        />
                    ) : (
                        <p className="text-gray-500">{profile.address}</p>
                    )}

                    <p className="font-medium">Created At :</p>
                    <p className="text-gray-500">{formatDate(profile.createdAt)}</p>

                    <p className="font-medium">Updated At :</p>
                    <p className="text-gray-500">{formatDate(profile.updatedAt)}</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-10">
                {isEdit ? (
                    <button
                        className="border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Save Information
                    </button>
                ) : (
                    <div className="flex gap-5">
                        <button
                            className="border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all cursor-pointer"
                            onClick={() => setIsEdit(true)}
                        >
                            Edit
                        </button>
                        <button className="border bg-red-500 px-8 py-2 rounded-full text-white hover:bg-red-600 transition-all cursor-pointer"
                        onClick={()=>{
                            localStorage.removeItem("token")
                            navigate("/")
                            deleteMember()
                        }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
