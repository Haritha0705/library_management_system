import axios from "axios";
import { getToken } from "../Utils/tokenHelper";

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


export const getProfile = async (id: string) => {
    const token = getToken();

    try {
        const response = await axios.get(`${API_URL}/member/get-profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.memberData;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};
