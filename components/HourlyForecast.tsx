"use client";

import { useEffect, useState } from "react";
import { currentWeather } from "@/app/actions/weatherActions";
import { useSearchParams } from "next/navigation";
import Forecast from "@/components/Forecast";
import { useTempStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";

const HourlyForecast = () => {
  const params = useSearchParams();
  const { isCelsius } = useTempStore();
  const [forecasts, setForecasts] = useState<Hour[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (params) {
        const long = Number(params.get("lon"));
        const lat = Number(params.get("lat"));
        try {
          setLoading(true);
          const data: CurrentResults = await currentWeather({ long, lat });
          setLoading(false);
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
    <>
      {!loading ? (
        <div className={"mt-6 bg-indigo-50 rounded-2xl py-5 px-4"}>
          <h1 className={"uppercase body text-gray-900/60 mb-3"}>
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
        <Skeleton className="bg-[#EAEAEA] mt-6 rounded-2xl py-5 px-4">
          <Skeleton
            className={
              "w-[155.37px] h-[11.57px] bg-[#D8D8D8] rounded-none mb-6"
            }
          />

          <div className="flex items-center overflow-x-auto gap-3 no-scrollbar">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className={
                    "flex flex-col items-center justify-center gap-3.5 rounded-none bg-[#F1EFEF] py-3 px-4 w-[95px] h-[108px]"
                  }
                >
                  <Skeleton
                    className={
                      "bg-[#D8D8D8] rounded-none w-[59.39px] h-[11.57px]"
                    }
                  />

                  <Skeleton
                    className={"bg-[#D8D8D8] rounded-none w-[32px] h-[32px]"}
                  />
                  <Skeleton
                    className={
                      "bg-[#D8D8D8] rounded-none w-[23.19px] h-[11.6px]"
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

export default HourlyForecast;
