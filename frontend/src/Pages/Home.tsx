import React from 'react';
import Header from "../Components/Header.tsx";
import CategoryMenu from "../Components/CategoryMenu.tsx";
import TopBooks from "../Components/TopBooks.tsx";
import Display from "../Components/Display.tsx";
import Subscribe from "../Components/Subscribe.tsx";

const Home:React.FC = () => {
    return(
        <div>
            <Header/>
            <CategoryMenu/>
            <TopBooks/>
            <Display/>
            <Subscribe/>
        </div>
    )
}

export default Home;