"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { formatTemperature } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTempStore } from "@/store";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

const CurrentWeather = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<CurrentResults>();

  useEffect(() => {
    const fetchWeather = async () => {
      if (searchParams) {
        setLoading(true);
        const lat = Number(searchParams.get("lat"));
        const long = Number(searchParams.get("lon"));
        const data = await currentWeather({ long, lat });
        setWeatherData(data);
        setLoading(false);
      } else {
        setLoading(true);
        const data = await currentWeather({});
        setWeatherData(data);
        setLoading(false);
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
        <div className="flex justify-between lg:col-span-8 mt-12">
          <div className="flex flex-col">
            <Skeleton className="h-[14px] w-[108px] bg-[#D8D8D8] mb-5" />
            <div>
              <Skeleton className="h-[28.84px] w-[122.16px] bg-[#D8D8D8] mb-6" />
              <Skeleton className="h-[51.54px] w-[188.83px] bg-[#D8D8D8]" />
            </div>
          </div>

          <Skeleton className={"w-[164px] h-[154px] bg-[#EAEAEA]"} />
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
