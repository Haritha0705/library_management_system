import React, { useContext } from 'react';
import { AdminContext } from "../Context/AdminContext.ts";
import {useNavigate} from "react-router-dom";
import logo from "../assets/Combo shape.svg"

const NavBar:React.FC = () => {
    const navigate = useNavigate();
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("Login must be used within an AdminProvider");
    }

    const { token,setToken } = adminContext;

    const logout = () => {
        navigate("/")
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div className="flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b">
            <div className="flex items-center gap-2 text-xs">
                <img className="cursor-pointer h-8 sm:w-40" src={logo} alt="Admin Logo" />
                <p className="border px-2 py-0.5 rounded-full border-gray-500 to-gray-600">
                    {token ? 'Admin' : 'Doctor'}
                </p>
            </div>
            <button
                onClick={logout}
                className="bg-primary text-white text-sm px-10 rounded-full py-2 cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
}

export default NavBar;
