"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { currentWeather, searchWeather } from "@/app/actions/weatherActions";
import { useRouter } from "next/navigation";
import { RecentSearches, useRecentStore, useTempStore } from "@/store";
import Image from "next/image";
import { formatTemperature } from "@/lib/utils";

const Search = () => {
  const router = useRouter();
  const { isCelsius } = useTempStore();
  const { recentSearches, addRecentSearch, clearAll, removeRecentSearch } =
    useRecentStore();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 500);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResults[]>([]);

  const handleSearch = async ({
    lat,
    lon,
    text,
  }: {
    lat: number;
    lon: number;
    text: string;
  }) => {
    setSearchInput(text);
    const data: RecentSearches = await currentWeather({ long: lon, lat: lat });
    addRecentSearch(data);
    setShowDropdown(false);
    setShowRecent(false);
    router.push(`/?lat=${lat}&lon=${lon}`);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchInput) {
        setShowRecent(false);
        const data = await searchWeather(debouncedSearchInput);
        if (data) {
          setSuggestions(data);
          setShowDropdown(true);
        }
      } else {
        setShowDropdown(false);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchInput]);

  const handleBlur = () => {
    setTimeout(() => {
      setShowRecent(false);
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className="flex-grow relative">
      <input
        type="text"
        placeholder="Search for cities"
        className="bg-indigo-50 border-none outline-none rounded-md py-2 px-5 w-full focus:outline-indigo-400"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => {
          if (!searchInput) {
            setShowRecent(true);
          }
        }}
        onBlur={handleBlur}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white rounded-md mt-2 max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion) => {
            const lat = suggestion.lat;
            const lon = suggestion.lon;
            const text = suggestion.name;
            return (
              <li
                key={suggestion.id}
                className="bg-indigo-50 py-2 px-4 body text-gray-900 cursor-pointer hover:bg-indigo-400 hover:text-white"
                onMouseDown={() => handleSearch({ lat, lon, text })}
              >
                {suggestion.name}
                {suggestion.region && `, ${suggestion.region}`}
                {suggestion.country && `, ${suggestion.country}`}
              </li>
            );
          })}
        </ul>
      )}

      {showRecent && recentSearches.length === 0 && (
        <ul className="no-scrollbar bg-indigo-50 absolute top-full left-0 right-0 rounded-md mt-2 max-h-60 overflow-auto z-10">
          <div className="flex flex-col py-2 px-4 gap-3">
            <p className="headline-sm text-gray-900">Recent</p>
            <p>You have no recent locations</p>
          </div>
        </ul>
      )}

      {showRecent && recentSearches.length > 0 && (
        <ul className="no-scrollbar bg-indigo-50 absolute top-full left-0 right-0 rounded-md mt-2 max-h-60 overflow-auto z-10">
          <div className="flex items-center justify-between pt-2 px-4 mb-2">
            <p className="headline-sm text-gray-900">Recent</p>
            <p
              className="text-[#5C6BC0]/60 cursor-pointer body-3"
              onClick={clearAll}
            >
              Clear all
            </p>
          </div>
          {recentSearches.map((recent, index) => {
            const temp = isCelsius
              ? recent.current.temp_c
              : recent.current.temp_f;
            const lat = recent.location.lat;
            const lon = recent.location.lon;
            const text = recent.location.name;
            return (
              <div
                key={index}
                className="flex items-center justify-between cursor-pointer hover:bg-indigo-400 py-2 px-4 hover:text-white"
              >
                <div
                  className="flex items-center gap-4"
                  onClick={() => handleSearch({ lat, lon, text })}
                >
                  <img
                    src={recent.current.condition.icon}
                    alt={recent.current.condition.text}
                    width={24}
                    height={24}
                  />

                  <p className="body-3 text-gray-900">
                    {formatTemperature(temp)}&deg;
                  </p>

                  <div className="flex flex-col hover:text-white">
                    <p>{recent.location.name}</p>
                    <p className="text-gray-900/60 text-[12px]">
                      {recent.location.region}, {recent.location.country}
                    </p>
                  </div>
                </div>
                <Image
                  src="/assets/icons/trash-icon.svg"
                  alt="Delete Icon"
                  width={16}
                  height={18}
                  onClick={() => removeRecentSearch(lat, lon)}
                />
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
