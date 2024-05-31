type SearchResults = {
  id: number;
  name: string;
  region?: string;
  country?: string;
  lat: number;
  lon: number;
};

type Current = {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_mph: number;
  wind_kph: number;
  uv: number;
  feelslike_c: number;
  feelslike_f: number;
  pressure_mb: number;
  pressure_in: number;
  vis_km: number;
  vis_miles: number;
};

type CurrentResults = {
  location: {
    name: string;
    localtime: string;
  };
  current: Current;
  forecast: {
    forecastday: ForecastDay[];
  };
};

type Hour = {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
};

type ForecastDay = {
  day: {
    mintemp_c: number;
    mintemp_f: number;
    daily_chance_of_rain: number;
  };
  hour: Hour[];
  astro: {
    sunrise: string;
    sunset: string;
  };
};

type MyLocation = {
  longitude?: number;
  latitude?: number;
};
