import React, {useContext, useEffect, useState} from "react";
import userimg from "../assets/userIcon.png"
import type {UserModel, UserResponse} from "../Model/user.model.ts";
import {AdminContext} from "../Context/AdminProvider.tsx";
import {getProfile} from "../Services/user.Service.ts";
import {toast} from "react-toastify";


const MyProfile: React.FC = () => {
    const [profile,setProfile] = useState<UserModel | null>(null)
    const [loading, setLoading] = useState(true);

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { token,memberId } = adminContext;
    const role = "member"

    useEffect(() => {
        if (!token || !memberId) {
            setLoading(false);
            return;
        }
        const getUser = async  () => {
            try {
                const res:UserResponse = await getProfile(memberId,role,token)
                setProfile(res.data)
            } catch (apiError: any) {
                toast.error(apiError.message || "Failed to fetch member profile");
                console.error("Error fetching member profile:", apiError);
            }finally {
                setLoading(false);
            }
        }
        getUser()
    }, [token,memberId,role]);

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                <img
                    src={profile.image?.trim() ? profile.image : userimg}
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full object-cover shadow-md"
                />
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                    {profile.username}
                </h2>
                <p className="text-sm text-gray-500">Member</p>
                <p className="text-sm mt-2 text-gray-600">{profile.email}</p>
                <div className="mt-6">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
