
export const saveToken = (token: string): void => {
    localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};

export const removeToken = (): void => {
    localStorage.removeItem("token");
};


import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    id: string;
    email: string;
}

export const getUserIdFromToken = (): string | null => {
    const token = getToken();
    console.log("🟠 Raw token:", token);
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        console.log("🟠 Decoded token:", decoded);
        return decoded.id;
    } catch (e) {
        console.error("🔴 Token decode failed:", e);
        return null;
    }
};
