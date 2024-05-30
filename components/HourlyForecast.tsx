"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useSearchParams } from "next/navigation";
import Forecast from "@/components/Forecast";
import { useTempStore } from "@/store";

const HourlyForecast = () => {
  const params = useSearchParams();
  const { isCelsius } = useTempStore();
  const [forecasts, setForecasts] = useState<Hour[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (params) {
        const long = Number(params.get("lon"));
        const lat = Number(params.get("lat"));
        try {
          const data: CurrentResults = await currentWeather({ long, lat });
          setForecasts(data.forecast.forecastday[0].hour);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [params]);
  console.log(forecasts);
  return (
    <div className={"mt-6 bg-indigo-50 rounded-2xl py-4 px-3"}>
      <h1 className={"uppercase body text-gray-900/60 mb-3"}>
        Today's Forecast
      </h1>

      <div className={"flex flex-wrap justify-center overflow-x-scroll"}>
        {forecasts?.map((forecast) => {
          const temp = isCelsius ? forecast.temp_c : forecast.temp_f;
          return <Forecast temp={temp} />;
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
