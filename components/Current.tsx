"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useTempStore } from "@/store";
import { formatTemperature } from "@/lib/utils";
import moment from "moment";
import { CurrentWeatherSkeleton } from "@/components/Skeletons";

const CurrentWeather = ({ lat, lon }: { lat?: number; lon?: number }) => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<CurrentResults>();

  useEffect(() => {
    const fetchData = async () => {
      if (lat !== undefined && lon !== undefined) {
        const data = await currentWeather({ lat, lon });
        setWeatherData(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [lat, lon]);
  const time = moment(weatherData?.location.localtime).format("Do MMM, dddd");
  const icon = `${weatherData?.current.condition.icon}`.replace(
    /64x64/g,
    "128x128",
  );
  const { isCelsius } = useTempStore();
  return (
    <>
      {!loading ? (
        <section className={"mt-12 flex justify-between items-center"}>
          <div className={"flex flex-col"}>
            <p className={"body text-gray-900/60"}>{time}</p>

            <p className={"headline-lg text-gray-900"}>
              {weatherData?.location.name}
            </p>

            <p className={"headline-xl text-gray-900"}>
              {formatTemperature(
                isCelsius
                  ? weatherData?.current.temp_c
                  : weatherData?.current.temp_f,
              )}
              &deg;/
              {formatTemperature(
                isCelsius
                  ? weatherData?.forecast.forecastday[0].day.mintemp_c
                  : weatherData?.forecast.forecastday[0].day.mintemp_f,
              )}
              &deg;
            </p>
          </div>

          <img
            src={icon}
            alt={weatherData?.current.condition.text}
            width={164}
            height={164}
            className={"bg-cover"}
          />
        </section>
      ) : (
        <CurrentWeatherSkeleton />
      )}
    </>
  );
};

export default CurrentWeather;
