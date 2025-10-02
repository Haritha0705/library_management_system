import React, {
    createContext,
    useState,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import type {UserModel, UserResponse} from "../Models/user.model.ts";
import {getProfile} from "../Service/user.Service.ts";
import {toast} from "react-toastify";

interface CustomJwtPayload {
    id?:string
    role?: string;
    email?: string;
}

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    role: string;
    setRole: Dispatch<SetStateAction<string>>;
    librarianId:string
    profile:UserModel | null;
    loading: boolean;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("AdminToken") || "");
    const [role, setRole] = useState<string>("");
    const [profile, setProfile] = useState<UserModel | null>(null);
    const [librarianId, setlibrarianId] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<CustomJwtPayload>(token);
                setRole(decoded.role || "");
                setlibrarianId(decoded.id || "")
            } catch (error) {
                console.error("Invalid token", error);
                setRole("");
                setlibrarianId("")
            }
        } else {
            setRole("");
            setlibrarianId("")
        }
    }, [token]);

    useEffect(() => {
        if (!token || !librarianId) {
            setLoading(false);
            return;
        }
        const getUser = async () => {
            try {
                const res: UserResponse = await getProfile(librarianId, token);
                setProfile(res.data);
            } catch (apiError: any) {
                toast.error(apiError.message || "Failed to fetch member profile");
                console.error("Error fetching member profile:", apiError);
            }
        };
        getUser()
    }, [token, librarianId]);

    return (
        <AdminContext.Provider value={{ token, setToken, role, setRole,profile,librarianId,loading }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
