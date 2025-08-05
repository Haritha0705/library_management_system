import React, { useEffect, useState } from "react";
import { getProfile } from "../Services/authService";
import { getUserIdFromToken } from "../Utils/tokenHelper";

export interface UserProfile {
    name: string;
    email: string;
    role: string;
    profilePic: string;
    bio?: string;
}

const MyProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId: string | null = getUserIdFromToken();

                if (!userId) {
                    setError("User ID not found. Please log in again.");
                    return;
                }

                const data = await getProfile(userId);
                setProfile(data);
            } catch (err: any) {
                console.log(err)
                setError("Failed to fetch profile. Please try again.");
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <>
            {profile ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
                        <img
                            src={profile.profilePic || "/default-profile.png"}
                            alt="Profile"
                            className="w-24 h-24 mx-auto rounded-full object-cover shadow-md"
                        />
                        <h2 className="text-2xl font-semibold mt-4 text-gray-800">{profile.name}</h2>
                        <p className="text-sm text-gray-500">{profile.role}</p>
                        <p className="text-sm mt-2 text-gray-600">{profile.email}</p>
                        {profile.bio && (
                            <p className="text-gray-700 text-base mt-4">{profile.bio}</p>
                        )}

                        <div className="mt-6">
                            <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex items-center justify-center text-lg text-gray-600">
                    Loading profile...
                </div>
            )}
        </>
    );
};

export default MyProfile;
