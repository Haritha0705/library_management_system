import React, {useContext, useState} from 'react';
import {assets} from "../../assets/assets.ts";
import {NavLink, useNavigate} from "react-router-dom";
import { Menu, X,ChevronDown } from "lucide-react";
import {AppContext} from "../../Context/AppContext.tsx";

const NavBar:React.FC = () => {

    const [showMenu,setShowMenu] = useState(false)
    const navigate = useNavigate();

    const adminContext = useContext(AppContext);

    if (!adminContext) return null;

    const { token,setToken,profile } = adminContext;

    const logout = () =>{
        localStorage.removeItem("token")
        setToken("");
    }

    return(
        <div className={"flex mb-5 py-4 items-center justify-between border-b border-b-gray-400"}>
            <div className={"flex gap-2"}>
                <img onClick={()=>navigate("/")} src={assets.logo} className={"w-8 cursor-pointer"} alt={"logo"}/>
                <p className={"text-primary font-semibold text-xl"}>Booklett</p>
            </div>
            <ul className={"hidden gap-5 md:flex items-start font-medium"}>
                <NavLink to={"/"}>
                    <li className={"py-1"}>Home</li>
                    <hr className={"border-none outline-none h-0.5 w3/5 m-auto bg-primary hidden"}/>
                </NavLink>
                <NavLink to={"/books"}>
                    <li className={"py-1"}>Books</li>
                    <hr className={"border-none outline-none h-0.5 w3/5 m-auto bg-primary hidden"}/>
                </NavLink>
                <NavLink to={"/about"}>
                    <li className={"py-1"}>About</li>
                    <hr className={"border-none outline-none h-0.5 w3/5 m-auto bg-primary hidden"}/>
                </NavLink>
                <NavLink to={"/contact"}>
                    <li className={"py-1"}>Contact</li>
                    <hr className={"border-none outline-none h-0.5 w3/5 m-auto bg-primary hidden"}/>
                </NavLink>
            </ul>
            <div className={"flex items-center gap-4"}>
                {
                    token
                    ? <div className={"cursor-pointer flex items-center gap-5"}>
                        <img className={"w-10 rounded-full"} src={profile?.image} onClick={()=>navigate("/my-profile")} alt={""}/>
                        <div className={"cursor-pointer flex items-center gap-2 group relative"}>
                            <ChevronDown/>
                            <div className={"absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block"}>
                                <div className={"min-w-48 bg-stone-100 rounded-xl flex flex-col gap-4 p-4"}>
                                    <p onClick={()=>navigate("/my-profile")} className={"hover:text-black cursor-pointer"}>My Profile</p>
                                    <p onClick={()=>navigate("/borrow-history")} className={"hover:text-black cursor-pointer "}>My Borrow History</p>
                                    <p onClick={logout} className={"hover:text-black cursor-pointer"}>Logout</p>
                                </div>
                            </div>
                        </div>

                      </div>
                    : <button className={"bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block "}
                              onClick={()=>navigate("/login")}>Create Account
                        </button>
                }
                <Menu onClick={()=>setShowMenu(true)} className={"md:hidden"} size={40}/>
                {/*Mobile Menu*/}
                {
                    token
                        ? <div className={`${showMenu ? 'fixed w-full justify-between flex flex-col pb-5 p-3' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                            <div className={"flex items-center justify-between px-5 py-6"}>
                                <img onClick={()=>navigate("/")} src={assets.logo} className={"w-12 cursor-pointer"} alt={"logo"}/>
                                <X onClick={()=>setShowMenu(false)} size={40}/>
                            </div>
                            <ul className={"flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium"}>
                                <NavLink  onClick={()=>setShowMenu(false)} to={"/"}><p className={"px-4 py-2 rounded-full inline-block"}>Home</p></NavLink>
                                <NavLink  onClick={()=>setShowMenu(false)} to={"/books"}><p className={"px-4 py-2 rounded-full inline-block"}>All Books</p></NavLink>
                                <NavLink  onClick={()=>setShowMenu(false)} to={"/about"}><p className={"px-4 py-2 rounded-full inline-block"}>About</p></NavLink>
                                <NavLink  onClick={()=>setShowMenu(false)} to={"/contact"}><p className={"px-4 py-2 rounded-full inline-block"}>Contact</p></NavLink>
                            </ul>
                            <button className={"bg-primary text-white py-2 px-4 rounded-full font-light"}
                                    onClick={logout}>Logout
                            </button>
                        </div>
                        : <div className={`${showMenu ? 'fixed w-full justify-between flex flex-col pb-5 p-3' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                                <div className={"flex items-center justify-between px-5 py-6"}>
                                    <img onClick={()=>navigate("/")} src={assets.logo} className={"w-12 cursor-pointer"} alt={"logo"}/>
                                    <X onClick={()=>setShowMenu(false)} size={40}/>
                                </div>
                                <ul className={"flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium"}>
                                    <NavLink  onClick={()=>setShowMenu(false)} to={"/"}><p className={"px-4 py-2 rounded-full inline-block"}>Home</p></NavLink>
                                    <NavLink  onClick={()=>setShowMenu(false)} to={"/books"}><p className={"px-4 py-2 rounded-full inline-block"}>All Books</p></NavLink>
                                    <NavLink  onClick={()=>setShowMenu(false)} to={"/about"}><p className={"px-4 py-2 rounded-full inline-block"}>About</p></NavLink>
                                    <NavLink  onClick={()=>setShowMenu(false)} to={"/contact"}><p className={"px-4 py-2 rounded-full inline-block"}>Contact</p></NavLink>
                                </ul>
                                <button className={"bg-primary text-white py-2 px-4 rounded-full font-light"}
                                        onClick={()=>navigate("/login")}>Create Account
                                </button>
                            </div>
                }
            </div>
        </div>
    )
}



export default NavBar;