import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import homeLogo from "../../assets/home_icon.svg"
import appointmentLogo from "../../assets/appointment_icon.svg"
import peopleLogo from "../../assets/people_icon.svg"
import addLogo from "../../assets/add_icon.svg"
import {AdminContext} from "../../Context/AdminContext.tsx";
import { GrUpdate } from "react-icons/gr";

const SideBar:React.FC = () => {

    const adminContext = useContext(AdminContext);

    if (!adminContext) return null

    const { role,token } = adminContext;

    return (
        <div className={"min-h-screen bg-white border-r"}>
            {token && <>
                {role === "admin" ? (
                    <ul className={"text-[#515151] mt-5 "}>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/admin-dashboard'}>
                            <img src={homeLogo} alt={"AdminDashBoard-logo"}/>
                            <p>DashBoard</p>
                        </NavLink>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/all-borrowedBooks'}>
                            <img src={appointmentLogo} alt={"Borrowed-books-logo"}/>
                            <p>Not Return Books</p>
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
                ):(
                    <ul className={"text-[#515151] mt-5 "}>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/librarian-dashboard'}>
                            <img src={homeLogo} alt={"AdminDashBoard-logo"}/>
                            <p>DashBoard</p>
                        </NavLink>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/all-borrowedBooks'}>
                            <img src={appointmentLogo} alt={"Borrowed-books-logo"}/>
                            <p>Not Return Books</p>
                        </NavLink>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/add-book'}>
                            <img src={addLogo} alt={"add-logo"}/>
                            <p>Add Books</p>
                        </NavLink>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/member-list'}>
                            <img src={peopleLogo} alt={"people-logo"}/>
                            <p>Member List</p>
                        </NavLink>
                        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer md:px-9 ${isActive ? 'bg-[#F2F3Ff] border-r-4 border-primary':''} `} to={'/book-update'}>
                            <GrUpdate style={{ strokeWidth: 2 }} size={20} />
                            <p>Update Book</p>
                        </NavLink>
                    </ul>
                )}
            </>
            }
        </div>
    );
}

export default SideBar;