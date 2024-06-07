import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTemperature = (value: number | undefined) => {
  return value?.toFixed();
};

export const defaultLocation: MyLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
};
