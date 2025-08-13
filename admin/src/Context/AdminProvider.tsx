import React, {
    createContext,
    useState,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
    role?: string;
    email?: string;
}

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    role: string;
    setRole: Dispatch<SetStateAction<string>>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(token);
                setRole(decoded.role || "");
            } catch (error) {
                console.error("Invalid token", error);
                setRole("");
            }
        } else {
            setRole("");
        }
    }, [token]);

    return (
        <AdminContext.Provider value={{ token, setToken, role, setRole }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
