"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import Detail from "@/components/Detail";
import { useTempStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";

const WeatherDetails = () => {
  const { isCelsius } = useTempStore();
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState<ForecastDay>();
  const [current, setCurrent] = useState<Current>();

  useEffect(() => {
    const fetchDetails = async () => {
      const lat = Number(params.get("lat"));
      const long = Number(params.get("lon"));
      setLoading(true);
      const data: CurrentResults = await currentWeather({ long, lat });
      setDay(data.forecast.forecastday[0]);
      setCurrent(data.current);
      setLoading(false);
    };
    fetchDetails();
  }, [params]);

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

          <div className={"grid grid-cols-4 gap-6"}>
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
        <Skeleton
          className={"bg-[#EAEAEA] rounded-none mt-6 py-5 px-4 h-[308px]"}
        >
          <Skeleton
            className={
              "rounded-none bg-[#D8D8D8] w-[147.51px] h-[11.57px] mb-6"
            }
          />

          <div className={"grid grid-cols-4 gap-4"}>
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  className={
                    "bg-[#F1EFEF] rounded-none w-[241px] h-[105px] flex items-center justify-between  py-5 px-5"
                  }
                >
                  <div className={"flex flex-col gap-5"}>
                    <Skeleton
                      className={
                        "rounded-none w-[52.26px] h-[11.57px] bg-[#D8D8D8]"
                      }
                    />
                    <Skeleton
                      className={
                        "rounded-none w-[93.16px] h-[18.8px] bg-[#D8D8D8]"
                      }
                    />
                  </div>

                  <Skeleton
                    className={
                      "w-[26.67px] h-[25.49px] bg-[#D8D8D8] rounded-none"
                    }
                  />
                </Skeleton>
              ))}
          </div>
        </Skeleton>
      )}
    </>
  );
};

export default WeatherDetails;
