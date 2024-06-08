"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RecentSearches, useRecentStore, useTempStore } from "@/store";
import { currentWeather, searchWeather } from "@/app/actions/weatherActions";
import { formatTemperature } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { isCelsius } = useTempStore();
  const { recentSearches, addRecentSearch, clearAll, removeRecentSearch } =
    useRecentStore();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput] = useDebounce(searchInput, 300);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResults[]>([]);

  const handleSearch = async ({
    lat,
    lon,
    text,
  }: {
    lat?: number;
    lon?: number;
    text: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (lat && lon) {
      params.set("lat", lat.toString());
      params.set("lon", lon.toString());
      const data: RecentSearches = await currentWeather({ lat, lon });
      addRecentSearch(data);
      replace(`${pathname}?${params.toString()}`);
      setSearchInput(text);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchInput) {
        const data = await searchWeather(debouncedSearchInput);
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    };
    fetchData();
  }, [debouncedSearchInput]);

  useEffect(() => {
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const data = await currentWeather({
              lat: latitude,
              lon: longitude,
            });
            addRecentSearch(data);
          },
          (error) => {
            console.error("Error fetching location:", error);
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchCurrentLocation();
  }, []);
  return (
    <div className="flex-grow relative">
      <div
        className={`flex justify-between items-center bg-indigo-50 outline-none rounded-md py-2 px-5 w-full border-2  ${showDropdown && " border-indigo-400"}`}
      >
        <input
          type="text"
          placeholder="Search for cities"
          className="bg-indigo-50 outline-none w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
        />
        <X
          onMouseDown={() => setSearchInput("")}
          className={"cursor-pointer"}
        />
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white rounded-md mt-2 max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion) => {
            const lat = suggestion.lat;
            const lon = suggestion.lon;
            const text = `${suggestion.name}${suggestion.region ? `, ${suggestion.region}` : ""}${suggestion.country ? `, ${suggestion.country}` : ""}`;
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

      {showDropdown &&
        suggestions.length === 0 &&
        recentSearches.length === 0 && (
          <ul className="no-scrollbar bg-indigo-50 absolute top-full left-0 right-0 rounded-md mt-2 max-h-60 overflow-auto z-10">
            <div className="flex flex-col py-2 px-4 gap-3">
              <p className="headline-sm text-gray-900">Recent</p>
              <p>You have no recent locations</p>
            </div>
          </ul>
        )}

      {showDropdown &&
        suggestions.length === 0 &&
        recentSearches.length > 0 && (
          <ul className="no-scrollbar bg-indigo-50 absolute top-full left-0 right-0 rounded-md mt-2 max-h-60 overflow-auto z-10">
            <div className="flex items-center justify-between pt-2 px-4 mb-2">
              <p className="headline-sm text-gray-900">Recent</p>
              <p
                className="text-[#5C6BC0]/60 cursor-pointer body-3"
                onMouseDown={clearAll}
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
                    onMouseDown={() => handleSearch({ lat, lon, text })}
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
                    onMouseDown={() => removeRecentSearch(lat, lon)}
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
