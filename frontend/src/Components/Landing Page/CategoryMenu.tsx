import React from "react";
import { Link } from "react-router-dom";
import Fiction from "../../assets/Fiction icon.svg";
import Non_Fiction from "../../assets/Non Fiction icon.svg";
import Astronaut from "../../assets/Astronaut icon.svg";
import History from "../../assets/history icon.svg";
import Thrill from "../../assets/Thrill icon.svg";
import Poetry from "../../assets/Poetry icon.svg";

const CategoryData = [
    { category: "Fiction", image: Fiction },
    { category: "Non-fiction", image: Non_Fiction },
    { category: "Astronaut", image: Astronaut },
    { category: "History", image: History },
    { category: "Thriller", image: Thrill },
    { category: "Poetry", image: Poetry },
];

const CategoryMenu: React.FC = () => {
    return (
        <div
            className={"flex flex-col gap-4 items-center text-gray-800 py-16"}
            id={"speciality"}
        >
            <h1 className={"text-3xl font-medium"}>Find by Category</h1>
            <p className={"sm:w-1/3 text-sm text-center"}>
                Simply browse through our extensive collection of books, and discover
                your next great read with ease.
            </p>
            <div className={"flex sm:justify-center gap-4 pt-5 pb-2 w-full overflow-scroll"}>
                {CategoryData.map((item, index) => (
                    <Link
                        key={index}
                        to={`/books/${item.category}`}
                        onClick={() => scrollTo(0, 0)}
                        className="flex flex-col items-center gap-2 flex-shrink-0 p-4 bg-blue-100 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                        <img className={"w-16 sm:w-24 mb-2"} src={item.image.toString()} alt={item.category} />
                        <p>{item.category}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryMenu;
