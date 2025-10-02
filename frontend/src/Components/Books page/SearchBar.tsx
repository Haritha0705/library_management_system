import React, { useEffect, useState } from "react";
import type { SearchModel, SearchResponse } from "../../Model/search.model.ts";
import { searchBookByTitle } from "../../Services/book.Service.ts";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<SearchModel[]>([]);

    const navigate = useNavigate();

    const searchBook = async (value: string) => {
        try {
            const res: SearchResponse = await searchBookByTitle(value);
            setResults(res.data || []);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (search.length <= 1) {
            setResults([]);
            return;
        }

        const timeOut = setTimeout(() => {
            searchBook(search);
        }, 300);

        return () => clearTimeout(timeOut);
    }, [search]);

    return (
        <div className="relative shadow-xl rounded-2xl border">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
            className="h-5 w-5 text-[var(--text-secondary)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
        >
          <path
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              strokeLinecap="round"
              strokeLinejoin="round"
          ></path>
        </svg>
      </span>
            <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
                className="input w-full pl-10 pr-4 py-3"
                placeholder="Search by title"
            />

            {results.length > 0 && (
                <ul className="absolute bg-white w-full mt-1 border rounded shadow z-10">
                    {results.map((book, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xl font-semibold flex items-center gap-8"
                            onClick={() => navigate(`/order/${book._id}`)}
                        >
                            {book.image && (
                                <img src={book.image} alt={book.title} className="w-14 h-20 object-cover rounded" />
                            )}
                            {book.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
