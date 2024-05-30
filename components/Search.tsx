"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { searchWeather } from "@/app/actions/weatherActions";

const Search = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResults[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchInput) {
        const data = await searchWeather(debouncedSearchInput);
        if (data) {
          setSuggestions(data);
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };
    fetchSuggestions();
  }, [debouncedSearchInput]);

  return (
    <div className="flex-grow relative">
      <input
        type="text"
        placeholder="Search for cities"
        className={
          "bg-indigo-50 border-none outline-none rounded-md py-2 px-5 w-full focus:outline-indigo-400"
        }
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onClick={() => setShowDropdown((prevState) => !prevState)}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white rounded-md mt-2 max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={"bg-indigo-50 py-2 px-4 body text-gray-900"}
            >
              {suggestion.name}
              {suggestion.region && `, ${suggestion.region}`}
              {suggestion.country && `, ${suggestion.country}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
