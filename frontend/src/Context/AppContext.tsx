import React, {
    createContext,
    useState,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";
import {jwtDecode} from "jwt-decode";
import type {BookModel, BooksResponse} from "../Model/book.model.ts";
import {getAllBooks} from "../Services/book.Service.ts";
import {toast} from "react-toastify";
import type {UserModel, UserResponse} from "../Model/user.model.ts";
import {getProfile} from "../Services/user.Service.ts";

interface CustomJwtPayload {
    id?: string;
    role?: string;
}

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    memberId: string;
    books: BookModel[];
    profile:UserModel | null;
    loading: boolean;
    fetchBooks: () => void;
}

export const AppContext = createContext<AdminContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [memberId, setmemberId] = useState<string>("");
    const [books, setBooks] = useState<BookModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserModel | null>(null);

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

    useEffect(() => {
        if (!token || !memberId) {
            setLoading(false);
            return;
        }
        const getUser = async () => {
            try {
                const res: UserResponse = await getProfile(memberId, token);
                setProfile(res.data);
            } catch (apiError: any) {
                toast.error(apiError.message || "Failed to fetch member profile");
                console.error("Error fetching member profile:", apiError);
            }
        };
        getUser()
    }, [token, memberId]);

    const fetchBooks = async () => {
        try {
            const res: BooksResponse = await getAllBooks();
            setBooks(res.data);
        } catch (apiError: any) {
            toast.error(apiError.message || "Failed to fetch books");
            console.error("Error fetching books:", apiError);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <AppContext.Provider value={{ token, setToken, memberId,books, loading, fetchBooks,profile }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
