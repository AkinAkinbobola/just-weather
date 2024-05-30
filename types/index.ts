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
  };
  current: {
    temp_c: number;
    temp_f: number;
  };
};

type MyLocation = {
  longitude?: number;
  latitude?: number;
};
