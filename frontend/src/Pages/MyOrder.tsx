import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../Context/AppContext.tsx";
import type { HistoryModel, HistoryResponse } from "../Model/history.model.ts";
import { borrowHistory } from "../Services/book.Service.ts";

const MyOrder: React.FC = () => {
    const [data, setData] = useState<HistoryModel[]>([]);
    const adminContext = useContext(AppContext);
    const token = adminContext?.token || "";
    const memberId = adminContext?.memberId || "";

    useEffect(() => {
        if (!token || !memberId) return;

        const fetchBorrowHistory = async () => {
            try {
                const res: HistoryResponse = await borrowHistory(memberId, token);
                setData(res.data || []);
            } catch (e) {
                console.error(e);
            }
        };

        fetchBorrowHistory();
    }, [token, memberId]);

    return (
        <div className="h-screen overflow-y-auto p-4 space-y-4 bg-gray-50 w-full">
            {data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            {item.bookId.image ? (
                                <img
                                    src={item.bookId.image}
                                    alt={item.bookId.title}
                                    className="w-16 h-24 rounded object-cover border"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            ) : (
                                <div className="w-16 h-16 rounded bg-gray-300 flex items-center justify-center text-gray-600">
                                    ?
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-lg text-gray-800">{item.bookId.title}</p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Status:</span> {item.status}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Issue Date:</span>{" "}
                                    {new Date(item.issueDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Due Date:</span>{" "}
                                    {new Date(item.dueDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No borrow history found
                </p>
            )}
        </div>
    );
};

export default MyOrder;
