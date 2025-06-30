import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyProfile from "./Pages/MyProfile.tsx";
import React from "react";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<MyProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
