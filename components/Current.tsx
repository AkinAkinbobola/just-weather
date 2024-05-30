"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { formatTemperature } from "@/lib/utils";
import { useTempStore } from "@/store";

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

  const time = moment(weatherData?.location.localtime).format("Do MMM, dddd");
  const icon = `${weatherData?.current.condition.icon}`.replace(
    /64x64/g,
    "128x128",
  );
  const { isCelsius } = useTempStore();
  return (
    <section
      className={"mt-12 flex justify-between items-center lg:col-span-8"}
    >
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
  );
};

export default CurrentWeather;
