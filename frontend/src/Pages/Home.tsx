import React from 'react';
import Header from "../Components/Landing Page/Header.tsx";
import CategoryMenu from "../Components/Landing Page/CategoryMenu.tsx";
import TopBooks from "../Components/Landing Page/TopBooks.tsx";

const Home:React.FC = () => {
    return(
        <div>
            <Header/>
            <CategoryMenu/>
            <TopBooks/>
        </div>
    )
}

export default Home;