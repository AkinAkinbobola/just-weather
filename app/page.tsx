import Current from "@/components/Current";
import { Suspense } from "react";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import Head from "next/head";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      bds: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
const Home = () => {
  return (
    <main className={"grid grid-cols-12"}>
      <Head>
        <bds />
      </Head>
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
