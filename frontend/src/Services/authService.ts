import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
export const registerUser = async (name:string,email:string,password:string)=>{
    const response = await axios.post(`${API_URL}/member/register`,{
      name,email,password
    })
    return response.data
}

export const loginUser = async (email:string,password:string)=>{
    const response = await axios.post(`${API_URL}/member/login`,{
        email,password
    })
    return response.data
}

export const logoutUser = async ()=>{
    await axios.post(`${API_URL}/member/logout`)
}

// export const getProfile = async (id:string)=>{
//     try {
//         const response = await axios.get(`${API_URL}/member/get-profile/${id}`);
//         return response.data.memberData;
//     }catch (error) {
//         console.error("Error fetching profile:", error);
//         throw error;
//     }
//
// }

import { getToken } from "../Utils/tokenHelper";

export const getProfile = async (id: string) => {
    const token = getToken();
    console.log("🟡 getProfile() called with ID:", id);
    console.log("🟡 Using token:", token);

    try {
        const response = await axios.get(`${API_URL}/member/get-profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🟢 Response:", response.data);
        return response.data.memberData;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};
