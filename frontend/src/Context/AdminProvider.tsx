import React, {
    createContext,
    useState,
    useEffect,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";
import {jwtDecode} from "jwt-decode";
import type {BookModel} from "../Model/book.model.ts";
import {getAllBooks} from "../Services/book.Service.ts";

interface CustomJwtPayload {
    id?: string;
    role?: string;
}

export interface AdminContextType {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    memberId: string;
    books: BookModel[];
    loading: boolean;
    fetchBooks: () => void;

}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [memberId, setmemberId] = useState<string>("");
    const [books, setBooks] = useState<BookModel[]>([]);
    const [loading, setLoading] = useState(true);

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

    const fetchBooks = async () => {
        try {
            const res: BooksResponse = await getAllBooks(token);
            setBooks(res.data);
        } catch (apiError: any) {
            toast.error(apiError.message || "Failed to fetch books");
            console.error("Error fetching books:", apiError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        fetchBooks();
    }, [token]);

    return (
        <AdminContext.Provider value={{ token, setToken, memberId,books, loading, fetchBooks }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
