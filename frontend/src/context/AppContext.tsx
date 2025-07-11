import { createContext, type ReactNode } from "react";
import { books } from "../assets/assets.ts";

interface AppContextType {
    books: typeof books;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

const AppContextProvider = ({ children }: AppProviderProps) => {

    const value: AppContextType = {
        books,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
