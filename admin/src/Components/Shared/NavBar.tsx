import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Combo shape.svg";
import { AdminContext } from "../../Context/AdminContext.tsx";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const adminContext = useContext(AdminContext);

    if (!adminContext) return null;

    const { setToken, role,profile } = adminContext;

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b">
            <div className="flex items-center gap-2 text-xs">
                <img
                    className="cursor-pointer h-8 sm:w-40"
                    src={logo}
                    alt="Logo"
                    onClick={() => navigate("/")}
                />
                <p className="border px-2 py-0.5 rounded-full border-gray-500 to-gray-600">
                    {role}
                </p>
            </div>
            <div className={"flex items-center gap-10"}>
                {role === "librarian" && (
                    <img className={"w-10 rounded-full"} src={profile?.image} onClick={()=>navigate("/profile")} alt={profile?.name}/>
                )}
                <button
                    onClick={logout}
                    className="bg-primary text-white text-sm px-10 rounded-full py-2 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default NavBar;
