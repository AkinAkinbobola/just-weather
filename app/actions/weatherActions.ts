"use server";

const api_url = "http://api.weatherapi.com/v1";

export const searchWeather = async (query?: string) => {
  try {
    const response = await fetch(
      `${api_url}/search.json?q=${query}&key=${process.env.API_KEY}`,
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

export const currentWeather = async ({
  lat,
  lon,
}: {
  lat?: number;
  lon?: number;
}) => {
  try {
    const response = await fetch(
      `${api_url}/forecast.json?key=${process.env.API_KEY}&q=${lat}, ${lon}&days=1&aqi=no&alerts=no`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      message: "Error while fetching weather data",
    };
  }
};
