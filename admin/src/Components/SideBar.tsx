import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {AdminContext} from "../Context/AdminContext.ts";


const SideBar:React.FC = () => {

    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("Login must be used within an AdminProvider");
    }

    const { token } = adminContext;

    return (
        <div className={"min-h-screen bg-white border-r"}>
            {
                token && <ul className={"text-[#515151] mt-5 "}>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/admin-dashboard'}>
                    <img src={""} alt={""}/>
                    <p>DashBoard</p>
                </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/all-borrowedBooks'}>
                        <img src={""} alt={""}/>
                        <p>Borrowed Books</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/add-librarian'}>
                        <img src={""} alt={""}/>
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/librarians-list'}>
                        <img src={""} alt={""}/>
                        <p>librarians List</p>
                    </NavLink>
                </ul>
            }
        </div>
    );
}

export default SideBar;