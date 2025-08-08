import React, { useState, type ReactNode } from "react";
import { AdminContext, type AdminContextType } from "./AdminContext";

interface AdminProviderProps {
    children: ReactNode;
}

const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const backendURL = import.meta.env.VITE_BACKEND_URL as string;

    const value: AdminContextType = {
        token,
        setToken,
        backendURL
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
