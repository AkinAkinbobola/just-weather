import { create } from "zustand";

interface isCelsiusType {
  isCelsius: boolean;
  setIsCelsius: (isCelsius: boolean) => void;
}

export const useTempStore = create<isCelsiusType>((set) => ({
  isCelsius: true,
  setIsCelsius: (isCelsius: boolean) => set({ isCelsius }),
}));
