import React from "react";
import { Routes, Route } from "react-router-dom";
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
// import { ToastContainer, toast } from 'react-toastify';

const App: React.FC = () => {
    return (
        <div className={'mx-4 sm:mx-[10%]'}>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:category" element={<Books />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/my-orders" element={<MyOrder />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/cart" element={<Cart />} />

            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
