import React, { createContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";

export interface LibrarianContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

export const LibrarianContext = createContext<LibrarianContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

    return (
        <LibrarianContext.Provider value={{ token, setToken }}>
            {children}
        </LibrarianContext.Provider>
    );
};

export default AdminProvider;
