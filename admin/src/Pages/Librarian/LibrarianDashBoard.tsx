import React, {useContext, useEffect, useState} from 'react';
import {AdminContext} from "../../Context/AdminContext.tsx";
import type {DashBoardModel, DashBoardResponse} from "../../Models/dashBoard.model.ts";
import {librarianDashBoard} from "../../Service/dashBoard.service.ts";

const LibrarianDashBoard:React.FC = () => {
    const [data,setData] = useState<DashBoardModel | null>(null)

    const adminContext = useContext(AdminContext);

    if (!adminContext) return null

    const { token } = adminContext;

    useEffect(() => {
        if (!token) return
        const fetchDashBoardData = async ()=>{
            try {
                const res:DashBoardResponse = await librarianDashBoard(token)
                setData(res.data)
            }catch (e) {
                console.error(e)
            }
        }
        fetchDashBoardData()
    }, [token]);

    const stats = [
        { title: "Total Members", value: data?.memberCount},
        { title: "Total Books", value: data?.bookCount},
        {title: "Total Borrowed Books", value: data?.borrowedBooksCount},
        {title: "Total Category Books", value: data?.bookCategoryCount},
        { title: "Books Overdue", value: data?.overdueBooksCount},
        { title: "Total Author ", value: data?.bookAuthorCount},
    ];

    return (
        <div className="grid grid-cols-2 gap-4 py-4 px-16 w-full items-center justify-center">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-primary rounded-3xl p-4 text-white h-[250px] w-[640px] shadow-lg shadow-gray-400`}
                >
                    <div className="flex flex-col ">
                        <p className="text-3xl mb-5">{stat.title}</p>
                        <p className="text-6xl font-semibold">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LibrarianDashBoard;

