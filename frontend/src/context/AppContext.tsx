import { createContext, type ReactNode } from "react";
import { books } from "../assets/assets.ts";

// Define the shape of your context
interface AppContextType {
    books: typeof books;
    currencySymbol: string;
}

// Create context with default value as undefined
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props type for the provider
interface AppProviderProps {
    children: ReactNode;
}

const AppContextProvider = ({ children }: AppProviderProps) => {
    const currencySymbol = "$";

    const value: AppContextType = {
        books,
        currencySymbol,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
