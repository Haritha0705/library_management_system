import React, {useContext, useState} from 'react';
import adminContext from "../Context/AdminContext.jsx";

const Login = () => {
    const [state,setState] = useState("Admin");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {setToken,backendURL} =useContext(adminContext)
    return (
        <div>
            <form  className={"min-h-[80vh] flex items-center"}>
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
                    <button className={"bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer"}>Login</button>
                    {
                        state === 'Admin'
                            ? <p>Doctor Login <span onClick={()=>setState('Doctor')} className={"text-primary underline cursor-pointer"}>Click here</span></p>
                            : <p>Admin Login <span onClick={()=>setState('Admin')} className={"text-primary underline cursor-pointer"}>Click here</span></p>
                    }
                </div>
            </form>
        </div>
    );
};

export default Login;