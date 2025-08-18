import React, {useContext, useEffect, useState} from "react";
import userimg from "../assets/userIcon.png"
import type {UserModel, UserResponse} from "../Model/user.model.ts";
import {AdminContext} from "../Context/AdminProvider.tsx";
import {getProfile} from "../Services/user.Service.ts";
import {toast} from "react-toastify";
import { FiEdit2 } from "react-icons/fi";


const MyProfile: React.FC = () => {
    const [profile,setProfile] = useState<UserModel | null>(null)
    const [loading, setLoading] = useState(true);
    const [userData,setUserData] = useState({
        full_name:"",
        image:"",
        email:"",
        phone:"",
        address:"",
    })
    const [isEdit,setIsEdit] = useState<boolean>(false)

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
        <div className={"flex flex-col max-w-lg gap-2 text-sm"}>
            {
                isEdit ? (
                    <div className="flex mt-4">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        const imageUrl = URL.createObjectURL(file);
                                        setUserData(prev => ({ ...prev, image: imageUrl }));
                                    }
                                }}
                            />
                            <div className="relative">
                                <img
                                    src={profile.image?.trim() ? profile.image : userimg}
                                    alt={profile.username}
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
                        src={profile.image?.trim() ? profile.image : userimg}
                        alt={profile.username}
                        className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-md mt-4"
                    />
                )
            }

            <p className={"font-medium text-3xl   text-neutral-800 mt-4"}>{profile.username}</p>

            <hr/>
            <div>
                <p className={"text-neutral-500 underline mt-3"}>CONTACT INFORMATION</p>
                <div className={"grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700"}>
                    <p className={"font-medium"}>Email id:</p>
                    <p className={"text-blue-500"}>{profile.email}</p>
                    <p className={"font-medium"}>Phone :</p>
                    {
                        isEdit
                            ? <input className={"bg-gray-100 max-w-52"} type={"text"} value={userData.phone} onChange={e=>setUserData(prev => ({...prev,phone: e.target.value}))}/>
                            : <p className={"text-blue-400"}>{profile.phone}</p>
                    }
                </div>
            </div>
            <div>
                <p className={"text-neutral-500 underline mt-3"}>BASIC INFORMATION</p>
                <div className={"grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700"}>
                    <p className={"font-medium"}>Address :</p>
                    {
                        isEdit
                            ? <input className={"from-gray-50"} type={"text"} value={userData.address} onChange={e=>setUserData(prev => ({...prev,address: e.target.value}))}/>
                            : <p className={"from-gray-500"}>{userData.address}</p>
                    }
                </div>
            </div>
            <div className={"mt-10"}>
                {
                    isEdit
                        ? <button className={"border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all"} onClick={()=>setIsEdit(false)}>Save Information</button>
                        : <button className={"border border-primary px-8 py-2 rounded-full hover:text-white hover:bg-primary transition-all"} onClick={()=>setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    );
};

export default MyProfile;
