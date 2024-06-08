"use client";

import Current from "@/components/Current";
import { useEffect, useState } from "react";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";

const Home = ({
  searchParams,
}: {
  searchParams: { lat?: string; lon?: string };
}) => {
  const [location, setLocation] = useState<Partial<GeolocationCoordinates>>();
  const lat = Number(searchParams.lat);
  const lon = Number(searchParams.lon);
  useEffect(() => {
    const handleLocation = () => {
      if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
        setLocation({ latitude: lat, longitude: lon });
      } else {
        const success = (pos: GeolocationPosition) => {
          const {
            latitude,
            longitude,
            accuracy,
            altitude,
            altitudeAccuracy,
            heading,
            speed,
          } = pos.coords;
          setLocation({
            latitude,
            longitude,
            accuracy,
            altitude,
            altitudeAccuracy,
            heading,
            speed,
          });
        };

        const error = (err: GeolocationPositionError) => {
          console.error(err);
          setLocation({ latitude: 37.7749, longitude: -122.4194 });
        };

        const options = {
          maximumAge: 0,
          enableHighAccuracy: true,
          timeout: 5000,
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    };

    handleLocation();
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
