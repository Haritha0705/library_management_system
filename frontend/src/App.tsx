import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import MyProfile from "./Pages/MyProfile";
import NavBar from "./Components/Shared/NavBar";
import Footer from "./Components/Shared/Footer";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Order from "./Pages/Order";
import MyOrder from "./Pages/MyOrder";
import Books from "./Pages/Books";
import NotFoundPage from "./Pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./Context/AppContext";
import Category from "./Pages/Category";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const hideLayout = location.pathname === "/login";

    return (
        <div className="mx-4 sm:mx-[10%]">
            {!hideLayout && <NavBar />}
            <ToastContainer />
            {children}
            {!hideLayout && <Footer />}
        </div>
    );
};

const App: React.FC = () => {
    const adminContext = useContext(AppContext);

    if (!adminContext) return null;

    const { token } = adminContext;

    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/:category" element={<Category />} />
                    <Route path="/order/:bookId" element={<Order />} />

                    {token ? (
                        <>
                            <Route path="/my-profile" element={<MyProfile />} />
                            <Route path="/borrow-history" element={<MyOrder />} />
                        </>
                    ) : (
                        <Route path="/login" element={<Login />} />
                    )}

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
};

export default App;
