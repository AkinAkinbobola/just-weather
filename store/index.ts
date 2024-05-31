import { create } from "zustand";

type isCelsiusType = {
  isCelsius: boolean;
  setIsCelsius: (isCelsius: boolean) => void;
};

export const useTempStore = create<isCelsiusType>((set) => ({
  isCelsius: true,
  setIsCelsius: (isCelsius: boolean) => set({ isCelsius }),
}));

export type RecentSearches = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

type RecentSearchesType = {
  recentSearches: RecentSearches[];
  addRecentSearch: (search: RecentSearches) => void;
  removeRecentSearch: (lat: number, lon: number) => void;
  clearAll: () => void;
};

export const useRecentStore = create<RecentSearchesType>((set, get) => ({
  recentSearches: [],
  addRecentSearch: (search: RecentSearches) => {
    const currentSearches = get().recentSearches;
    const isDuplicate = currentSearches.some(
      (item) =>
        item.location.lat === search.location.lat &&
        item.location.lon === search.location.lon,
    );

    if (!isDuplicate) {
      set({ recentSearches: [...currentSearches, search] });
    }
  },
  removeRecentSearch: (lat: number, lon: number) => {
    const currentSearches = get().recentSearches;
    set({
      recentSearches: currentSearches.filter(
        (search) => search.location.lat !== lat || search.location.lon !== lon,
      ),
    });
  },
  clearAll: () => set({ recentSearches: [] }),
}));
