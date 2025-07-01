import React from 'react';
import {CategoryData} from "../assets/assets.ts";
import {Link} from "react-router-dom";

const CategoryMenu:React.FC = () => {
    return (
        <div className={"flex flex-col gap-4 items-center text-gray-800 py-16"} id={"speciality"}>
            <h1 className={"text-3xl font-medium"}>Find by Category</h1>
            <p className={"sm:w-1/3 text-sm text-center"}>Simply browse through our extensive collection of books, and discover your next great read with ease.</p>
            <div className={"flex sm:justify-center gap-4 pt-5 pb-2 w-full overflow-scroll"}>
                {CategoryData.map((item,index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className="flex flex-col items-center gap-2 flex-shrink-0 p-4 bg-blue-100 rounded-xl hover:translate-y-[-20px] transition-all duration-500 shadow-md hover:shadow-lg" key={index} to={`/books/${item.category}`}>
                        <img className={"w-16 sm:w-24 mb-2"} src={item.image.toString()} alt={""}/>
                        <p>{item.category}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryMenu;