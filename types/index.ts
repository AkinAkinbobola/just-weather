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
  };
  hour: Hour[];
};

type MyLocation = {
  longitude?: number;
  latitude?: number;
};
