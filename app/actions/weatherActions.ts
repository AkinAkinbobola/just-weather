const api_url = "https://api.weatherapi.com/v1";

export const searchWeather = async (query?: string) => {
    try {
        const response = await fetch(`${api_url}/search.json?q=${query}&key=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
