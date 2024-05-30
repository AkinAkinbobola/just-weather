const api_url = "https://api.weatherapi.com/v1";

export const searchWeather = async (query?: string) => {
  try {
    const response = await fetch(
      `${api_url}/search.json?q=${query}&key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentLocation = (): Promise<MyLocation> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error("Geolocation not supported"));
    }
  });
};

export const currentWeather = async ({
  long,
  lat,
}: {
  long?: number | undefined;
  lat?: number | undefined;
}) => {
  try {
    if (lat === 0 || long === 0) {
      const location = await getCurrentLocation();
      lat = location.latitude;
      long = location.longitude;
    }
    const response = await fetch(
      `${api_url}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&aqi=no&q=${lat}, ${long}&alerts=no&days=1`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
