"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useSearchParams } from "next/navigation";
import Forecast from "@/components/Forecast";
import { useTempStore } from "@/store";
import { defaultLocation } from "@/lib/utils";
import { ForecastsSkeleton } from "@/components/Skeletons";

const HourlyForecast = () => {
  const searchParams = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  const { isCelsius } = useTempStore();
  const [forecasts, setForecasts] = useState<Hour[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat === 0 && lon === 0) {
        const data = await currentWeather({
          lat: defaultLocation.latitude,
          lon: defaultLocation.longitude,
        });
        setForecasts(data.forecast.forecastday[0].hour);
        setLoading(false);
      } else {
        const data = await currentWeather({ lat, lon });
        setForecasts(data.forecast.forecastday[0].hour);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [searchParams]);
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
