"use client";

import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {useRouter} from "next/navigation";
import {searchWeather} from "@/app/actions/weatherActions";
import {cn} from "@/lib/utils";

const Search = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearchInput] = useDebounce(searchInput, 500);
    const [showDropdown, setShowDropdown] = useState(false)


    const searchHandler = async (query: string) => {
        const cities = await searchWeather(query)
    }

    useEffect(() => {
        if (debouncedSearchInput) {
            router.push(`/?search=${debouncedSearchInput}`);
        } else {
            router.push("/");
        }
    }, [debouncedSearchInput, router]);

    return (
        <div className="flex-grow relative">
            <input
                type="text"
                placeholder="Search for cities"
                className={"bg-indigo-50 border-none outline-none rounded-md py-2 px-5 w-full focus:outline-indigo-400"}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onClick={() => setShowDropdown((prevState) => !prevState)}
            />




        </div>
    );
};

export default Search;
