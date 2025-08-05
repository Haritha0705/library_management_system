import axios from "axios";

const API_URL = "http://localhost:3000/api/v1"

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