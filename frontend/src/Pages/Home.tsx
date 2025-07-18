import React from 'react';
import Header from "../Components/Header.tsx";
import CategoryMenu from "../Components/CategoryMenu.tsx";
import TopBooks from "../Components/TopBooks.tsx";

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