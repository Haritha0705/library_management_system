import React, {useState} from 'react';
import {assets} from "../assets/assets.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {Hamburger, HamburgerIcon, Heart, Menu, ShoppingBag, SidebarClose, X} from "lucide-react";

const NavBar:React.FC = () => {

    const [showMenu,setShowMenu] = useState(false)
    const [token,setToken] = useState(false)
    const navigate = useNavigate();


    return(
        <div className={"flex w-full fixed top-0 left-0 right-0 px-2 py-4 items-center justify-between"}>
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
                            <div className={"items-center justify-center p-2 border-2 border-primary rounded-full md:block hidden"}>
                                <ShoppingBag/>
                            </div>
                            <div className={"items-center justify-center  p-2 border-2 border-primary rounded-full md:block hidden"}>
                                <Heart/>
                            </div>
                            <img className={"w-10 rounded-full"} src={assets.profilePic} onClick={()=>navigate("/my-profile")} alt={""}/>
                            <button className={"bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block "}
                                    onClick={()=>navigate("/logout")}>Logout
                            </button>
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
                                <NavLink  onClick={()=>setShowMenu(false)} to={"/contact"}><p className={"px-4 py-2 rounded-full inline-block"}>Favourite</p></NavLink>
                                <NavLink  onClick={()=>setShowMenu(false)} to={"/contact"}><p className={"px-4 py-2 rounded-full inline-block"}>Cart</p></NavLink>
                            </ul>
                            <button className={"bg-primary text-white py-2 px-4 rounded-full font-light"}
                                    onClick={()=>navigate("/logout")}>Logout
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