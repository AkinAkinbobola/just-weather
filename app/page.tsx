import Current from "@/components/Current";
import { Suspense } from "react";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";

const Home = () => {
  return (
    <main>
      <Suspense>
        <Current />
      </Suspense>
      <Suspense>
        <HourlyForecast />
      </Suspense>
      <Suspense>
        <WeatherDetails />
      </Suspense>
    </main>
  );
};

export default Home;
