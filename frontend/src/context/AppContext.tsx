import { createContext, type ReactNode, useContext } from "react";
import { books } from "../assets/assets";

interface AppContextType {
    books: typeof books;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppContextProvider = ({ children }: AppProviderProps) => {
    const value: AppContextType = { books };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};

export default AppContextProvider;
