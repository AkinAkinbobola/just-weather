import Current from "@/components/Current";
import { Suspense } from "react";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";

const Home = () => {
  return (
    <main className={"grid grid-cols-12"}>
      <div className={"md:col-span-12"}>
        <Suspense>
          <Current />
        </Suspense>
        <Suspense>
          <HourlyForecast />
        </Suspense>
        <Suspense>
          <WeatherDetails />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
