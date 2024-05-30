"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useSearchParams } from "next/navigation";

const CurrentWeather = () => {
  const searchParams = useSearchParams();
  const [weatherData, setWeatherData] = useState<CurrentResults>();

  useEffect(() => {
    const fetchWeather = async () => {
      if (searchParams) {
        const lat = Number(searchParams.get("lat"));
        const long = Number(searchParams.get("lon"));
        const data = await currentWeather({ long, lat });
        setWeatherData(data);
      } else {
        const data = await currentWeather({});
        setWeatherData(data);
      }
    };
    fetchWeather();
  }, [searchParams]);

  return (
    <div>
      {weatherData?.current.temp_c}- {weatherData?.location.name}
    </div>
  );
};

export default CurrentWeather;
