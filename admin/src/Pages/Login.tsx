import React, { useContext, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { LoginModel,LoginResponse } from "../Models/login.model";
import { loginAdmin } from "../Service/auth.service.ts";
import {AdminContext} from "../Context/AdminProvider.tsx";

const Login: React.FC = () => {
    const [state, setState] = useState<"Admin" | "Librarian">("Admin");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const adminContext = useContext(AdminContext);

    if (!adminContext) return null

    const { setToken } = adminContext;

    const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reqBody: LoginModel = { email, password, role:state.toLowerCase() };

        try {
            const response: LoginResponse = await loginAdmin(reqBody) as LoginResponse;

            if (response?.success && response.token) {
                localStorage.setItem("token", response.token);
                setToken(response.token);
                navigate('/');
            } else {
                toast.error(response?.message || "Login failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <form onSubmit={onFinish} className="min-h-[80vh] flex items-center">
                <div className="flex flex-col m-auto gap-3 items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                    <p className="text-2xl font-semibold m-auto">
                        <span className="text-primary">{state}</span> Login
                    </p>

                    <div className="w-full">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="border border-[#DADADA] rounded w-full p-2 mt-1"
                            type="email"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <p>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="border border-[#DADADA] rounded w-full p-2 mt-1"
                            type="password"
                            required
                        />
                    </div>

                    <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer">
                        Login
                    </button>

                    {state === 'Admin' ? (
                        <p>
                            Librarian Login{" "}
                            <span onClick={() => setState('Librarian')} className="text-primary underline cursor-pointer">
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Admin Login{" "}
                            <span onClick={() => setState('Admin')} className="text-primary underline cursor-pointer">
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
