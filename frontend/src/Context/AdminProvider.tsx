import React, {
    createContext,
    useState,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

    return (
        <AdminContext.Provider value={{ token, setToken }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
