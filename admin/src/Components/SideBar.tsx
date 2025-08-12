import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import homeLogo from "../assets/home_icon.svg"
import appointmentLogo from "../assets/appointment_icon.svg"
import peopleLogo from "../assets/people_icon.svg"
import addLogo from "../assets/add_icon.svg"
import {AdminContext} from "../Context/AdminProvider.tsx";

const SideBar:React.FC = () => {

    const adminContext = useContext(AdminContext);

    if (!adminContext) return null

    const { token } = adminContext;

    return (
        <div className={"min-h-screen bg-white border-r"}>
            {token && <ul className={"text-[#515151] mt-5 "}>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/admin-dashboard'}>
                    <img src={homeLogo} alt={"AdminDashBoard-logo"}/>
                    <p>DashBoard</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/all-borrowedBooks'}>
                    <img src={appointmentLogo} alt={"Borrowed-books-logo"}/>
                    <p>Borrowed Books</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/add-librarian'}>
                    <img src={addLogo} alt={"add-logo"}/>
                    <p>Add librarians</p>
                </NavLink>
                <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/librarians-list'}>
                    <img src={peopleLogo} alt={"people-logo"}/>
                    <p>librarians List</p>
                </NavLink>
                </ul>
            }
        </div>
    );
}

export default SideBar;