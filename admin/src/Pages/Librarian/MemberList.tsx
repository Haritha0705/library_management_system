import React,{ useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import {AdminContext} from "../../Context/AdminProvider.tsx";
import type {MemberModel, MemberResponse} from "../../Models/member.model.ts";
import {getAllMembers} from "../../Service/member.service.ts";

const MemberList:React.FC = () => {
    const [membersList, setMembersList] = useState<MemberModel[]>([]);
    const [loading, setLoading] = useState(true);

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { token } = adminContext;

    const fetchData = async () => {
        try {
            const res: MemberResponse = await getAllMembers(token);
            setMembersList(res.data || []);
        } catch (apiError: any) {
            toast.error(apiError.message || "Failed to fetch Members");
            console.error("Error fetching Members:", apiError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        fetchData();
    }, [token]);


    if (loading) {
        return <div className="p-4 text-gray-600">Loading Members...</div>;
    }

    if (membersList.length === 0) {
        return <div className="p-4 text-gray-600">No Members</div>;
    }
    return (
        <div className="h-screen overflow-y-auto p-4 space-y-4 bg-gray-50 w-full">
            {membersList.map((member) => (
                <div
                    key={member._id}
                    className="flex items-center justify-between bg-white px-6 py-8 rounded-lg shadow-md border border-gray-200"
                >
                    <div className="flex items-center space-x-4">
                        {member.image && typeof member.image === "string" ? (
                            <img
                                src={member.image}
                                alt={member.username}
                                className="w-16 h-16 rounded-full object-cover border"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                ?
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-xl text-gray-800">{member.username}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MemberList;