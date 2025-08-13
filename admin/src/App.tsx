import React, {useContext} from "react";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import AddLibrarian from "./Pages/Admin/AddLibrarian.tsx"
import AdminDashBoard from "./Pages/Admin/AdminDashBoard.tsx"
import LibrarianDashBoard from "./Pages/Librarian/LibrarianDashBoard.tsx"
import LibrariansList from "./Pages/Admin/LibrariansList.tsx"
import AllBorrowedAdmin from "./Pages/Admin/AllBorrowed.tsx"
import AllBorrowedLibrarian from "./Pages/Librarian/AllBorrowed.tsx"
import Login from "./Pages/Login.tsx";
import NavBar from "./Components/NavBar.tsx";
import SideBar from "./Components/SideBar.tsx";
import {AdminContext} from "./Context/AdminProvider.tsx";
import MemberList from "./Pages/Librarian/MemberList.tsx";
import AddBook from "./Pages/Librarian/AddBook.tsx";

const App:React.FC = ()=> {

  const adminContext = useContext(AdminContext);

  if (!adminContext) return null

  const {token,role} = adminContext
    console.log(role)


  return token ?(
    <div className={"bg-[#F8F9FD]"}>
      <ToastContainer/>
        <NavBar/>
        <div className={"flex items-start"}>
            <SideBar/>
            <Routes>
                  {role === "admin" ? (
                  <>
                      <Route path={"/"} element={<></>}/>
                      <Route path={"/admin-dashboard"} element={<AdminDashBoard/>}/>
                      <Route path={"/all-borrowedBooks"} element={<AllBorrowedAdmin/>}/>
                      <Route path={"/add-librarian"} element={<AddLibrarian/>}/>
                      <Route path={"/librarians-list"} element={<LibrariansList/>}/>
                  </>
                  ):(
                  <>
                      <Route path={"/"} element={<></>}/>
                      <Route path={"/librarian-dashboard"} element={<LibrarianDashBoard/>}/>
                      <Route path={"/all-borrowedBooks"} element={<AllBorrowedLibrarian/>}/>
                      <Route path={"/add-book"} element={<AddBook/>}/>
                      <Route path={"/member-list"} element={<MemberList/>}/>
                  </>
                  )}
            </Routes>
        </div>
    </div>
  ):(
      <>
        <Login/>
        <ToastContainer/>
      </>
  )
}

export default App
