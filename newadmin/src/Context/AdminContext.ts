import { createContext, type Dispatch, type SetStateAction } from "react";

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    backendURL: string;
}

// Create context with default undefined
export const AdminContext = createContext<AdminContextType | undefined>(undefined);
