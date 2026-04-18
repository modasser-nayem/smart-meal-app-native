/**
 * CURRENCY CONSTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * Global currency configuration independent of language.
 * Users can select their preferred currency symbol.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SUPPORTED_CURRENCIES = {
   BDT: { symbol: "৳", label: "Bangladeshi Taka", code: "BDT" },
   USD: { symbol: "$", label: "US Dollar", code: "USD" },
   EUR: { symbol: "€", label: "Euro", code: "EUR" },
   GBP: { symbol: "£", label: "British Pound", code: "GBP" },
   INR: { symbol: "₹", label: "Indian Rupee", code: "INR" },
   PKR: { symbol: "₨", label: "Pakistani Rupee", code: "PKR" },
   AUD: { symbol: "A$", label: "Australian Dollar", code: "AUD" },
   CAD: { symbol: "C$", label: "Canadian Dollar", code: "CAD" },
   SGD: { symbol: "S$", label: "Singapore Dollar", code: "SGD" },
   JPY: { symbol: "¥", label: "Japanese Yen", code: "JPY" },
} as const;

export type SupportedCurrency = keyof typeof SUPPORTED_CURRENCIES;

export const DEFAULT_CURRENCY: SupportedCurrency = "BDT";
export const CURRENCY_STORAGE_KEY = "@smart_meal_currency";

/**
 * Format amount with currency symbol
 * @param amount - Numeric amount
 * @param currency - Currency code (e.g., "BDT", "USD")
 * @returns Formatted string (e.g., "৳1,234.56")
 */
export const formatCurrency = (
   amount: number,
   currency: SupportedCurrency = DEFAULT_CURRENCY,
): string => {
   const currencyInfo = SUPPORTED_CURRENCIES[currency];
   const formatted = amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
   });
   return `${currencyInfo.symbol}${formatted}`;
};

/**
 * Get currency symbol only
 * @param currency - Currency code
 * @returns Symbol (e.g., "৳")
 */
export const getCurrencySymbol = (currency: SupportedCurrency = DEFAULT_CURRENCY): string => {
   return SUPPORTED_CURRENCIES[currency].symbol;
};

/**
 * Get currency label
 * @param currency - Currency code
 * @returns Label (e.g., "Bangladeshi Taka")
 */
export const getCurrencyLabel = (currency: SupportedCurrency = DEFAULT_CURRENCY): string => {
   return SUPPORTED_CURRENCIES[currency].label;
};
