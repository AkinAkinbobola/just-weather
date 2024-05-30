import Current from "@/components/Current";
import { Suspense } from "react";
import HourlyForecast from "@/components/HourlyForecast";

const Home = () => {
  return (
    <main className={"grid grid-cols-12"}>
      <div className={"md:col-span-8"}>
        <Suspense>
          <Current />
        </Suspense>

        <HourlyForecast />
      </div>
    </main>
  );
};

export default Home;
