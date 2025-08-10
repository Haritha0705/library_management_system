import React, { useContext, useEffect, useState } from "react";
import type { LibrarianModel } from "../../Models/librarian.model.ts";
import { toast } from "react-toastify";
import { getAllLibrarians } from "../../Service/librarians-list.service.ts";
import { AdminContext } from "../../Context/AdminProvider.tsx";

const LibrariansList: React.FC = () => {
    const [librariansList, setLibrariansList] = useState<LibrarianModel[]>([]);
    const [loading, setLoading] = useState(true);

    const adminContext = useContext(AdminContext);
    if (!adminContext) return null;

    const { token, setToken } = adminContext;

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await getAllLibrarians(token);
                console.log(res);

                if (res.token && res.success) {
                    setToken(res.token);
                }

                if (Array.isArray(res.data)) {
                    setLibrariansList(res.data);
                } else {
                    setLibrariansList([]);
                }
            } catch (apiError: any) {
                toast.error(apiError.message || "Failed to fetch librarians");
                console.error("Error fetching librarians:", apiError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, setToken]);

    if (loading) {
        return <div>Loading librarians...</div>;
    }

    if (librariansList.length === 0) {
        return <div>No Users</div>;
    }

    return (
        <div>
            {librariansList.map((librarian) => (
                <div key={librarian.id}>
                    <p>{librarian.name}</p>
                    <p>{librarian.email}</p>
                    <p>{librarian.phone}</p>
                    <p>{librarian.address}</p>
                    {librarian.image && typeof librarian.image === "string" && (
                        <img
                            src={librarian.image}
                            alt={librarian.name}
                            width={50}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default LibrariansList;
