"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import Detail from "@/components/Detail";
import { useTempStore } from "@/store";
import { WeatherDetailsSkeleton } from "@/components/Skeletons";

const WeatherDetails = ({ lat, lon }: { lat?: number; lon?: number }) => {
  const { isCelsius } = useTempStore();
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState<ForecastDay>();
  const [current, setCurrent] = useState<Current>();

  useEffect(() => {
    const fetchWeather = async () => {
      if (lat !== undefined && lon !== undefined) {
        const data = await currentWeather({ lat, lon });
        setDay(data.forecast.forecastday[0]);
        setCurrent(data.current);
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon]);

  const chance_of_rain = `${day?.day.daily_chance_of_rain}%`;
  const pressure = isCelsius
    ? `${current?.pressure_mb} mb`
    : `${current?.pressure_in} in`;

  const wind = isCelsius
    ? `${current?.wind_kph} kph`
    : `${current?.wind_mph} mph`;

  const uv = `${current?.uv} of 10`;
  const feelsLike = isCelsius
    ? `${current?.feelslike_c}°`
    : `${current?.feelslike_f}°`;

  const visibility = isCelsius
    ? `${current?.vis_km} km`
    : `${current?.vis_miles} miles`;

  return (
    <>
      {!loading ? (
        <div className={"mt-6 bg-indigo-50 rounded-2xl py-5 px-4"}>
          <p className={"uppercase body-2 text-gray-900/60 mb-5"}>
            Weather Details
          </p>

          <div
            className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"}
          >
            <Detail
              name={"Sunrise"}
              value={day?.astro.sunrise}
              icon={"/assets/icons/sunrise-icon.svg"}
            />
            <Detail
              name={"Sunset"}
              value={day?.astro.sunset}
              icon={"/assets/icons/sunset-icon.svg"}
            />
            <Detail
              name={"Chance of rain"}
              value={chance_of_rain}
              icon={"/assets/icons/drop-icon.svg"}
            />
            <Detail
              name={"Pressure"}
              value={pressure}
              icon={"/assets/icons/pressure-icon.svg"}
            />
            <Detail
              name={"Wind"}
              value={wind}
              icon={"/assets/icons/wind-icon.svg"}
            />
            <Detail
              name={"UV Index"}
              value={uv}
              icon={"/assets/icons/sun-icon.svg"}
            />
            <Detail
              name={"Feels like"}
              value={feelsLike}
              icon={"/assets/icons/temperature-icon.svg"}
            />
            <Detail
              name={"Visibility"}
              value={visibility}
              icon={"/assets/icons/visibility-icon.svg"}
            />
          </div>
        </div>
      ) : (
        <WeatherDetailsSkeleton />
      )}
    </>
  );
};

export default WeatherDetails;
