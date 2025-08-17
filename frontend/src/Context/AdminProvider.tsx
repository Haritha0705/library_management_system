import React, {
    createContext,
    useState,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";
import {jwtDecode} from "jwt-decode";

interface CustomJwtPayload {
    memberId?: string;
    role?: string;
}

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    memberId: string;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [memberId, setmemberId] = useState<string>("");

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(token);
                setmemberId(decoded.id || "");
            } catch (error) {
                console.error("Invalid token", error);
                setmemberId("");
            }
        } else {
            setmemberId("");
        }
    }, [token]);

    return (
        <AdminContext.Provider value={{ token, setToken, memberId }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
