"use client";

import Current from "@/components/Current";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";

const Home = () => {
  const [location, setLocation] = useState<Partial<GeolocationCoordinates>>();
  const searchParams = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
      setLocation({
        latitude: lat,
        longitude: lon,
      });
    } else {
      const success = (pos: GeolocationPosition) => {
        const coords = pos.coords;
        setLocation(coords);
      };

      const error = (err: GeolocationPositionError) => {
        setLocation({
          latitude: 37.7749,
          longitude: -122.4194,
        });
      };

      const options = {
        maximumAge: 0,
        enableHighAccuracy: true,
        timeout: 5000,
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, [lat, lon]);
  return (
    <main>
      <Current lat={location?.latitude} lon={location?.longitude} />

      <HourlyForecast lat={location?.latitude} lon={location?.longitude} />

      <WeatherDetails lat={location?.latitude} lon={location?.longitude} />
    </main>
  );
};

export default Home;
