"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import Forecast from "@/components/Forecast";
import { useTempStore } from "@/store";
import { ForecastsSkeleton } from "@/components/Skeletons";

const HourlyForecast = ({ lat, lon }: { lat?: number; lon?: number }) => {
  const { isCelsius } = useTempStore();
  const [forecasts, setForecasts] = useState<Hour[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat !== undefined && lon !== undefined) {
        const data = await currentWeather({ lat, lon });
        setForecasts(data.forecast.forecastday[0].hour);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon]);
  return (
    <>
      {!loading ? (
        <div className={"mt-6 bg-indigo-50 rounded-2xl py-5 px-4"}>
          <h1 className={"uppercase body-2 text-gray-900/60 mb-3"}>
            Today's Forecast
          </h1>

          <div
            className={"flex items-center overflow-x-auto gap-3 no-scrollbar"}
          >
            {forecasts?.map((forecast, index) => {
              const temp = isCelsius ? forecast.temp_c : forecast.temp_f;
              return (
                <Forecast
                  temp={temp}
                  time={forecast.time}
                  icon={forecast.condition.icon}
                  text={forecast.condition.text}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <ForecastsSkeleton />
      )}
    </>
  );
};

export default HourlyForecast;
