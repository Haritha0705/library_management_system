import React, { useContext, useEffect, useState } from "react";
import type { LibrarianModel, LibrarianResponse } from "../../Models/librarian.model";
import { toast } from "react-toastify";
import { deleteLibrarian, getAllLibrarians } from "../../Service/librarians.service";
import { AdminContext } from "../../Context/AdminProvider";

const LibrariansList: React.FC = () => {
    const [librariansList, setLibrariansList] = useState<LibrarianModel[]>([]);
    const [loading, setLoading] = useState(true);

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { token } = adminContext;

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const res: LibrarianResponse = await getAllLibrarians(token);
            setLibrariansList(res.data || []);
        } catch (apiError: any) {
            toast.error(apiError.message || "Failed to fetch librarians");
            console.error("Error fetching librarians:", apiError);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteLibrarian(id, token);
            toast.success("Librarian deleted successfully");
            setLibrariansList((prev) => prev.filter((lib) => lib._id !== id));
        } catch (apiError: any) {
            toast.error(apiError.message || "Failed to delete librarian");
            console.error("Error deleting librarian:", apiError);
        }
    };

    if (loading) {
        return <div className="p-4 text-gray-600">Loading librarians...</div>;
    }

    if (librariansList.length === 0) {
        return <div className="p-4 text-gray-600">No Users</div>;
    }

    return (
        <div className="h-screen overflow-y-auto p-4 space-y-4 bg-gray-50 w-full">
            {librariansList.map((librarian) => (
                <div
                    key={librarian._id}
                    className="flex items-center justify-between bg-white px-6 py-8 rounded-lg shadow-md border border-gray-200"
                >
                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                        {librarian.image && typeof librarian.image === "string" ? (
                            <img
                                src={librarian.image}
                                alt={librarian.name}
                                className="w-16 h-16 rounded-full object-cover border"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                ?
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-xl text-gray-800">{librarian.name}</p>
                            <p className="text-sm text-gray-500">{librarian.email}</p>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleDelete(librarian._id)}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg text-sm font-medium transition"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LibrariansList;
