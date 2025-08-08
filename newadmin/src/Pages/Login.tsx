import React, {useContext, useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {AdminContext} from "../Context/AdminContext.ts";

interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

const Login:React.FC = () => {
    const [state,setState] = useState<"Admin" | "Librarian">("Admin");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("Login must be used within an AdminProvider");
    }

    const { setToken, backendURL } = adminContext;

    const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            if (state === "Admin"){
                const {data} = await axios.post<LoginResponse>
                (`${backendURL}/admin/login`,
                    {email,password})
                if (data.success && data.token){
                    localStorage.setItem("token",data.token)
                    setToken(data.token)
                }else {
                    toast.error(data.message || "Login failed")
                }
            }else {
                toast.info("Librarian login not implemented yet")
            }
        }catch (e) {
            console.error(e)
            toast.error("Something went wrong");
        }
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler} className={"min-h-[80vh] flex items-center"}>
                <div className={"flex flex-col m-auto gap-3 items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-[#5E5E5E] text-sm shadow-lg"}>
                    <p className={"text-2xl font-semibold m-auto"}><span className={"text-primary"}>{state}</span>{" "}Login</p>
                    <div className={"w-full"}>
                        <p>Email</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className={"border border-[#DADADA] rounded w-full p-2 mt-1"} type={"email"} required/>
                    </div>
                    <div className={"w-full"}>
                        <p>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className={"border border-[#DADADA] rounded w-full p-2 mt-1"} type={"password"} required/>
                    </div>
                    <button className={"bg-blue-400 text-white w-full py-2 rounded-md text-base cursor-pointer"}>Login</button>
                    {
                        state === 'Admin'
                            ? <p>Librarian Login <span onClick={()=>setState('Librarian')} className={"text-primary underline cursor-pointer"}>Click here</span></p>
                            : <p>Admin Login <span onClick={()=>setState('Admin')} className={"text-primary underline cursor-pointer"}>Click here</span></p>
                    }
                </div>
            </form>
        </div>
    );
};

export default Login;
