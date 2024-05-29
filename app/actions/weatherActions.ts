const api_url = "http://api.weatherapi.com/v1/"

export const searchWeather = async (query: string) => {
    const response = await fetch(`${api_url}/search.json?q=${query}&key=${process.env.API_KEY}`)
    return await response.json()
}