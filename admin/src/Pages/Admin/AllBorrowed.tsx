import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context/AdminContext.tsx";
import { BorrowBookList } from "../../Service/dashBoard.service.ts";
import type {
    BorrowBookListModel,
    BorrowBookListResponse,
} from "../../Models/borrowBookList.model.ts";

const AllBorrowed: React.FC = () => {
    const [data, setData] = useState<BorrowBookListModel[] | null>(null);
    const adminContext = useContext(AdminContext);

    if (!adminContext) return null;

    const { token } = adminContext;

    useEffect(() => {
        if (!token) return;

        const fetchNotReturnBook = async () => {
            try {
                const res: BorrowBookListResponse = await BorrowBookList(token);
                setData(res.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchNotReturnBook();
    }, [token]);

    return (
        <div className="p-4 space-y-4">
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
                    >
                        <p className="text-gray-700 dark:text-gray-200 font-medium">
                            <span className="font-semibold">Member ID:</span> {item.memberId}
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 font-medium">
                            <span className="font-semibold">Book ID:</span> {item.bookId}
                        </p>
                        <p
                            className={`font-medium ${
                                item.status === "issued"
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-green-600 dark:text-green-400"
                            }`}
                        >
                            <span className="font-semibold">Status:</span> {item.status}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No borrowed books found
                </p>
            )}
        </div>

    );
};

export default AllBorrowed;
