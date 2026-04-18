import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency, getCurrencySymbol } from "@/constants/currency";

/**
 * Hook to format amounts with the user's selected currency
 * @returns Object with formatting functions
 */
export const useCurrencyFormat = () => {
   const { currency } = useCurrency();

   return {
      /**
       * Format amount with currency symbol
       * @param amount - Numeric amount
       * @returns Formatted string (e.g., "৳1,234.56")
       */
      format: (amount: number) => formatCurrency(amount, currency),

      /**
       * Get currency symbol only
       * @returns Symbol (e.g., "৳")
       */
      symbol: () => getCurrencySymbol(currency),

      /**
       * Get current currency code
       * @returns Currency code (e.g., "BDT")
       */
      code: () => currency,
   };
};
