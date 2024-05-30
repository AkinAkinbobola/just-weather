type SearchResults = {
  id: number;
  name: string;
  region?: string;
  country?: string;
  lat: number;
  lon: number;
};

type CurrentResults = {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: ForecastDay[];
  };
};

type ForecastDay = {
  day: {
    mintemp_c: number;
    mintemp_f: number;
  };
};

type MyLocation = {
  longitude?: number;
  latitude?: number;
};
