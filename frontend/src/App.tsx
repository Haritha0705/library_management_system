import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import MyProfile from "./Pages/MyProfile.tsx";
import NavBar from "./Components/NavBar.tsx";
import Footer from "./Components/Footer.tsx";
import Login from "./Pages/Login.tsx";
import Contact from "./Pages/Contact.tsx";
import About from "./Pages/About.tsx";
import Order from "./Pages/Order.tsx";
import MyOrder from "./Pages/MyOrder.tsx";
import Books from "./Pages/Books.tsx";
import Favourite from "./Pages/Favourite.tsx";
import Cart from "./Pages/Cart.tsx";
import NotFoundPage from "./Pages/NotFoundPage.tsx";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./Context/AdminProvider.tsx";

const App: React.FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) return null;

    const { token } = adminContext;

    return (
        <BrowserRouter>
            {token ? (
                <div className="mx-4 sm:mx-[10%]">
                    <NavBar />
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/books/:category" element={<Books />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/order/:bookId" element={<Order />} />
                        <Route path="/my-orders" element={<MyOrder />} />
                        <Route path="/favourite" element={<Favourite />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
                </div>
            ) : (
                <>
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
};

export default App;
