import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SupportedCurrency, DEFAULT_CURRENCY, CURRENCY_STORAGE_KEY } from "@/constants/currency";

interface CurrencyContextType {
   currency: SupportedCurrency;
   setCurrency: (currency: SupportedCurrency) => Promise<void>;
   isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
   const [currency, setCurrencyState] = useState<SupportedCurrency>(DEFAULT_CURRENCY);
   const [isLoading, setIsLoading] = useState(true);

   // Load currency preference on mount
   useEffect(() => {
      const loadCurrency = async () => {
         try {
            const saved = await AsyncStorage.getItem(CURRENCY_STORAGE_KEY);
            if (saved) {
               setCurrencyState(saved as SupportedCurrency);
            }
         } catch (error) {
            console.error("Failed to load currency preference:", error);
         } finally {
            setIsLoading(false);
         }
      };

      loadCurrency();
   }, []);

   const setCurrency = async (newCurrency: SupportedCurrency) => {
      try {
         setCurrencyState(newCurrency);
         await AsyncStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
      } catch (error) {
         console.error("Failed to save currency preference:", error);
      }
   };

   return (
      <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
         {children}
      </CurrencyContext.Provider>
   );
};

export const useCurrency = () => {
   const context = useContext(CurrencyContext);
   if (!context) {
      throw new Error("useCurrency must be used within CurrencyProvider");
   }
   return context;
};
