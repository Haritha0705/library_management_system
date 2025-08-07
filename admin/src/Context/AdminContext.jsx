import {createContext, useState} from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem("token") || "")
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const value = {
        token,
        setToken:setToken,
        backendURL
    }

    return(
        <AdminContextProvider value={value}>
            {props.children}
        </AdminContextProvider>
    )
}
export default AdminContextProvider