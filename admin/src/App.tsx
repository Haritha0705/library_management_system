import React, {useContext} from "react";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import AddLibrarian from "./Pages/Admin/AddLibrarian.tsx"
import AdminDashBoard from "./Pages/Admin/AdminDashBoard.tsx"
import LibrarianDashBoard from "./Pages/Librarian/LibrarianDashBoard.tsx"
import LibrariansList from "./Pages/Admin/LibrariansList.tsx"
import Login from "./Pages/Login.tsx";
import NavBar from "./Components/Shared/NavBar.tsx";
import SideBar from "./Components/Shared/SideBar.tsx";
import {AdminContext} from "./Context/AdminContext.tsx";
import MemberList from "./Pages/Librarian/MemberList.tsx";
import AddBook from "./Pages/Librarian/AddBook.tsx";
import AllBorrowed from "./Components/DashBoard/AllBorrowed.tsx";
import MyProfile from "./Pages/Librarian/MyProfile.tsx";

const App:React.FC = ()=> {

  const adminContext = useContext(AdminContext);

  if (!adminContext) return null

  const {token,role} = adminContext

  return token ?(
    <div className={"bg-[#F8F9FD]"}>
      <ToastContainer/>
        <NavBar/>
        <div className={"flex items-start"}>
            <SideBar/>
            <Routes>
                  {role === "admin" ? (
                  <>
                      <Route path={"/"} element={<AdminDashBoard/>}/>
                      <Route path={"/admin-dashboard"} element={<AdminDashBoard/>}/>
                      <Route path={"/all-borrowedBooks"} element={<AllBorrowed/>}/>
                      <Route path={"/add-librarian"} element={<AddLibrarian/>}/>
                      <Route path={"/librarians-list"} element={<LibrariansList/>}/>
                  </>
                  ):(
                  <>
                      <Route path={"/"} element={<AdminDashBoard/>}/>
                      <Route path={"/librarian-dashboard"} element={<LibrarianDashBoard/>}/>
                      <Route path={"/all-borrowedBooks"} element={<AllBorrowed/>}/>
                      <Route path={"/add-book"} element={<AddBook/>}/>
                      <Route path={"/member-list"} element={<MemberList/>}/>
                      <Route path={"/profile"} element={<MyProfile/>}/>
                  </>
                  )}
            </Routes>
        </div>
    </div>
  ):(
      <>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
        <ToastContainer/>
      </>
  )
}

export default App
