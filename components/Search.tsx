"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

const Search = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearchInput] = useDebounce(searchInput, 500);

    useEffect(() => {
        if (debouncedSearchInput) {
            router.push(`/?search=${debouncedSearchInput}`);
        } else {
            router.push("/");
        }
    }, [debouncedSearchInput, router]);

    return (
        <input
            type="text"
            placeholder="Search for cities"
            className="bg-indigo-50 border-none outline-none rounded-md py-2 px-5 flex-grow"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
        />
    );
};

export default Search;
