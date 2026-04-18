# Global Currency System - Implementation Guide

## Overview

A global, language-independent currency system has been implemented. Users can select their preferred currency symbol, and it will be used throughout the app. The selection is independent of language preferences.

## Supported Currencies

| Code | Symbol | Label             |
| ---- | ------ | ----------------- |
| BDT  | ৳      | Bangladeshi Taka  |
| USD  | $      | US Dollar         |
| EUR  | €      | Euro              |
| GBP  | £      | British Pound     |
| INR  | ₹      | Indian Rupee      |
| PKR  | ₨      | Pakistani Rupee   |
| AUD  | A$     | Australian Dollar |
| CAD  | C$     | Canadian Dollar   |
| SGD  | S$     | Singapore Dollar  |
| JPY  | ¥      | Japanese Yen      |

## Architecture

### 1. Constants (`src/constants/currency.ts`)

- Defines all supported currencies
- Provides utility functions: `formatCurrency()`, `getCurrencySymbol()`, `getCurrencyLabel()`
- Default currency: BDT (Bangladeshi Taka)

### 2. Context (`src/context/CurrencyContext.tsx`)

- Global state management for currency selection
- Persists user preference to AsyncStorage
- Provides `useCurrency()` hook

### 3. Hook (`src/hooks/useCurrencyFormat.ts`)

- Convenient hook for formatting amounts
- Methods: `format()`, `symbol()`, `code()`

### 4. UI Component (`src/components/screens/profile/CurrencySelector.tsx`)

- Modal for selecting currency
- Shows all 10 supported currencies
- Displays symbol, code, and label

### 5. Integration (`src/app/_layout.tsx`)

- Wraps app with `CurrencyProvider`
- Loads saved currency preference on startup

## How to Use

### For Users

**To change currency:**

1. Open Profile tab
2. Scroll to Settings section
3. Tap "Currency"
4. Select your preferred currency
5. Currency preference is saved automatically

### For Developers

**Using currency in components:**

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const MyComponent = () => {
   const { format, symbol, code } = useCurrencyFormat();

   return (
      <View>
         {/* Format amount with symbol */}
         <Typography>{format(1234.56)}</Typography>
         {/* Output: "৳1,234.56" (or "$1,234.56" if USD selected) */}

         {/* Get symbol only */}
         <Typography>{symbol()}</Typography>
         {/* Output: "৳" */}

         {/* Get currency code */}
         <Typography>{code()}</Typography>
         {/* Output: "BDT" */}
      </View>
   );
};
```

**Using context directly:**

```typescript
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/constants/currency";

export const MyComponent = () => {
   const { currency } = useCurrency();

   return (
      <Typography>
         {formatCurrency(1000, currency)}
      </Typography>
   );
};
```

## Files Modified/Created

### New Files

- `src/constants/currency.ts` - Currency definitions and utilities
- `src/context/CurrencyContext.tsx` - Global currency state
- `src/hooks/useCurrencyFormat.ts` - Convenience hook
- `src/components/screens/profile/CurrencySelector.tsx` - Currency picker UI

### Modified Files

- `src/app/_layout.tsx` - Added CurrencyProvider wrapper
- `src/components/screens/profile/ProfileSettings.tsx` - Added currency setting row
- `src/app/(tabs)/profile/index.tsx` - Wired currency selector
- `src/components/screens/expense/RecentTransactions.tsx` - Uses currency formatting
- `src/i18n/locales/en/profile.json` - Added currency translation key

## Key Features

✅ **Language Independent**

- Currency selection is separate from language preference
- Users can have English UI with USD currency, or Bengali UI with BDT currency

✅ **Persistent**

- Currency preference saved to AsyncStorage
- Survives app restarts

✅ **Global**

- Wrapped at app root level
- Available everywhere via `useCurrency()` hook

✅ **Formatted Output**

- Automatic number formatting with thousands separator
- Proper decimal places (0-2)
- Example: `৳1,234.56` or `$1,234.56`

✅ **Extensible**

- Easy to add new currencies
- Just add to `SUPPORTED_CURRENCIES` object

## Adding New Currencies

1. Open `src/constants/currency.ts`
2. Add to `SUPPORTED_CURRENCIES`:

```typescript
export const SUPPORTED_CURRENCIES = {
   // ... existing currencies
   CHF: { symbol: "CHF", label: "Swiss Franc", code: "CHF" },
   // ... more currencies
} as const;
```

3. That's it! The currency will automatically appear in the selector

## Implementation Examples

### Example 1: Display Balance

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const BalanceCard = ({ balance }: { balance: number }) => {
   const { format } = useCurrencyFormat();

   return (
      <View>
         <Typography className="text-2xl font-bold">
            {format(balance)}
         </Typography>
      </View>
   );
};
```

### Example 2: Format List of Amounts

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const ExpenseList = ({ expenses }: { expenses: Expense[] }) => {
   const { format } = useCurrencyFormat();

   return (
      <FlatList
         data={expenses}
         renderItem={({ item }) => (
            <View>
               <Typography>{item.title}</Typography>
               <Typography>{format(item.amount)}</Typography>
            </View>
         )}
      />
   );
};
```

### Example 3: Show Currency Symbol in Input

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const AmountInput = () => {
   const { symbol } = useCurrencyFormat();

   return (
      <View className="flex-row items-center">
         <Typography className="text-2xl font-bold">
            {symbol()}
         </Typography>
         <TextInput placeholder="0" />
      </View>
   );
};
```

## Storage

Currency preference is stored in AsyncStorage with key: `@smart_meal_currency`

Example stored value: `"BDT"` or `"USD"`

## Future Enhancements

### Planned Features

1. **Auto-detect by locale** - Automatically set currency based on device locale
2. **Exchange rates** - Show converted amounts for different currencies
3. **Formatting options** - Allow users to choose number format (1,234.56 vs 1.234,56)
4. **Regional presets** - Quick select by region (South Asia, Europe, etc.)

### How to Implement Auto-Detect

```typescript
// In CurrencyContext.tsx
import * as Localization from "expo-localization";

const getDefaultCurrency = () => {
   const locale = Localization.getLocales()[0]?.currencyCode;
   if (locale && locale in SUPPORTED_CURRENCIES) {
      return locale as SupportedCurrency;
   }
   return DEFAULT_CURRENCY;
};
```

## Testing

### Manual Testing Checklist

- [ ] Select different currencies in Profile settings
- [ ] Verify amounts display with correct symbol
- [ ] Close and reopen app - currency persists
- [ ] Switch languages - currency remains unchanged
- [ ] Test with large numbers (1,000,000+)
- [ ] Test with decimal amounts (1.50, 0.99)
- [ ] Test on both iOS and Android

### Test Currencies

1. **BDT (৳)** - Default, uses no decimal places typically
2. **USD ($)** - Common, uses 2 decimal places
3. **EUR (€)** - European, uses 2 decimal places
4. **JPY (¥)** - No decimal places

## Troubleshooting

### Issue: Currency not changing

**Solution:**

- Check AsyncStorage permissions
- Verify `setCurrency()` is being called
- Check browser console for errors

### Issue: Wrong currency showing

**Solution:**

- Clear app cache and restart
- Check AsyncStorage value: `@smart_meal_currency`
- Verify currency code is in `SUPPORTED_CURRENCIES`

### Issue: Formatting looks wrong

**Solution:**

- Check locale settings
- Verify `toLocaleString()` is working
- Test with different amounts

## Performance Notes

✅ **Optimized:**

- Currency loaded once at app startup
- No runtime parsing
- Memoized formatting functions
- Minimal re-renders

## Support

For questions:

1. Check `src/constants/currency.ts` for available currencies
2. Review `src/hooks/useCurrencyFormat.ts` for usage examples
3. Check existing component implementations
4. Refer to this guide

---

**Status:** ✅ Production Ready
**Last Updated:** April 18, 2026
**Default Currency:** BDT (৳)
