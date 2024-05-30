"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { searchWeather } from "@/app/actions/weatherActions";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResults[]>([]);

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setShowDropdown(false);
    router.push(`/?search=${query}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchInput) {
        const data = await searchWeather(debouncedSearchInput);
        if (data) {
          setSuggestions(data);
        }
      } else {
        setSuggestions([]);
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
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={() => setShowDropdown(!showDropdown)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white rounded-md mt-2 max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={
                "bg-indigo-50 py-2 px-4 body text-gray-900 cursor-pointer"
              }
              onClick={() => handleSearch(suggestion.name)}
            >
              {suggestion.name}
              {suggestion.region && `, ${suggestion.region}`}
              {suggestion.country && `, ${suggestion.country}`}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && suggestions.length === 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white rounded-md mt-2 max-h-60 overflow-auto z-10">
          <li
            className={
              "bg-indigo-50 py-2 px-4 body text-gray-900 cursor-pointer"
            }
          >
            No results found
          </li>
        </ul>
      )}
    </div>
  );
};

export default Search;
