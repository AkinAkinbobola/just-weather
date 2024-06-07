import { Skeleton } from "@/components/ui/skeleton";

export const CurrentWeatherSkeleton = () => {
  return (
    <div className="flex justify-between lg:col-span-8 mt-12">
      <div className="flex flex-col">
        <Skeleton className="h-[14px] w-[108px] bg-[#D8D8D8] mb-5 rounded-none" />
        <div>
          <Skeleton className="h-[28.84px] w-[122.16px] bg-[#D8D8D8] mb-6 rounded-none" />
          <Skeleton className="h-[51.54px] w-[188.83px] bg-[#D8D8D8] rounded-none" />
        </div>
      </div>

      <Skeleton className={"w-[164px] h-[154px] bg-[#EAEAEA] rounded-none"} />
    </div>
  );
};

export const ForecastsSkeleton = () => {
  return (
    <Skeleton className="bg-[#EAEAEA] mt-6 rounded-2xl py-5 px-4">
      <Skeleton
        className={"w-[155.37px] h-[11.57px] bg-[#D8D8D8] rounded-none mb-6"}
      />

      <div className="flex items-center overflow-x-auto gap-3 no-scrollbar">
        {Array(14)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              className={
                "flex flex-col items-center justify-center gap-3.5 rounded-none bg-[#F1EFEF] py-3 px-4 w-[95px] h-[108px]"
              }
            >
              <Skeleton
                className={"bg-[#D8D8D8] rounded-none w-[59.39px] h-[11.57px]"}
              />

              <Skeleton
                className={"bg-[#D8D8D8] rounded-none w-[32px] h-[32px]"}
              />
              <Skeleton
                className={"bg-[#D8D8D8] rounded-none w-[23.19px] h-[11.6px]"}
              />
            </Skeleton>
          ))}
      </div>
    </Skeleton>
  );
};

export const WeatherDetailsSkeleton = () => {
  return (
    <Skeleton className={"bg-[#EAEAEA] rounded-none mt-6 py-5 px-4 h-[308px]"}>
      <Skeleton
        className={"rounded-none bg-[#D8D8D8] w-[147.51px] h-[11.57px] mb-6"}
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
                  className={"rounded-none w-[93.16px] h-[18.8px] bg-[#D8D8D8]"}
                />
              </div>

              <Skeleton
                className={"w-[26.67px] h-[25.49px] bg-[#D8D8D8] rounded-none"}
              />
            </Skeleton>
          ))}
      </div>
    </Skeleton>
  );
};
