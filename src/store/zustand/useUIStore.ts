import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UIStore {
   theme: "dark" | "light";
   isLoading: boolean;
   setTheme: (t: "dark" | "light") => void;
   setIsLoading: (v: boolean) => void;
}

export const useUIStore = create<UIStore>()(
   persist(
      (set) => ({
         theme: "dark",
         isLoading: false,
         setTheme: (theme) => set({ theme }),
         setIsLoading: (isLoading) => set({ isLoading }),
      }),
      { name: "ui-store", storage: createJSONStorage(() => AsyncStorage) },
   ),
);
