# Currency System - Quick Start Guide

## 🎯 For Users

### How to Change Currency

1. Open **Profile** tab
2. Scroll to **Settings** section
3. Tap **Currency**
4. Select your preferred currency
5. Done! All amounts now show with that symbol

### Supported Currencies

- 🇧🇩 **BDT** (৳) - Bangladeshi Taka - **DEFAULT**
- 🇺🇸 **USD** ($) - US Dollar
- 🇪🇺 **EUR** (€) - Euro
- 🇬🇧 **GBP** (£) - British Pound
- 🇮🇳 **INR** (₹) - Indian Rupee
- 🇵🇰 **PKR** (₨) - Pakistani Rupee
- 🇦🇺 **AUD** (A$) - Australian Dollar
- 🇨🇦 **CAD** (C$) - Canadian Dollar
- 🇸🇬 **SGD** (S$) - Singapore Dollar
- 🇯🇵 **JPY** (¥) - Japanese Yen

## 👨‍💻 For Developers

### Basic Usage

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const MyComponent = () => {
   const { format, symbol, code } = useCurrencyFormat();

   return (
      <View>
         {/* Format amount with symbol */}
         <Text>{format(1234.56)}</Text>
         {/* Output: "৳1,234.56" or "$1,234.56" depending on user selection */}

         {/* Get symbol only */}
         <Text>{symbol()}</Text>
         {/* Output: "৳" or "$" */}

         {/* Get currency code */}
         <Text>{code()}</Text>
         {/* Output: "BDT" or "USD" */}
      </View>
   );
};
```

### Replace Hardcoded Amounts

**Before:**

```typescript
<Typography>৳{amount.toLocaleString()}</Typography>
```

**After:**

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const MyComponent = ({ amount }) => {
   const { format } = useCurrencyFormat();
   return <Typography>{format(amount)}</Typography>;
};
```

### Using Context Directly

```typescript
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/constants/currency";

export const MyComponent = ({ amount }) => {
   const { currency } = useCurrency();
   return <Typography>{formatCurrency(amount, currency)}</Typography>;
};
```

## 🏗️ Architecture

```
src/
├── constants/
│   └── currency.ts              ← Currency definitions
├── context/
│   └── CurrencyContext.tsx       ← Global state
├── hooks/
│   └── useCurrencyFormat.ts      ← Convenience hook
├── components/
│   └── screens/profile/
│       └── CurrencySelector.tsx  ← UI component
└── app/
    └── _layout.tsx              ← Provider wrapper
```

## 🔄 How It Works

1. **App starts** → `CurrencyProvider` loads saved currency from AsyncStorage
2. **User selects currency** → `CurrencySelector` modal opens
3. **User picks currency** → `setCurrency()` saves to AsyncStorage
4. **Context updates** → All components using `useCurrency()` re-render
5. **Amounts update** → All `format()` calls use new currency

## 💾 Data Storage

```
AsyncStorage
├── Key: "@smart_meal_currency"
└── Value: "BDT" | "USD" | "EUR" | ... (currency code)
```

## 🎨 Examples

### Example 1: Display Balance

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const BalanceCard = ({ balance }) => {
   const { format } = useCurrencyFormat();

   return (
      <View>
         <Typography className="text-2xl font-bold">
            {format(balance)}
         </Typography>
      </View>
   );
};

// Output: "৳5,000" or "$5,000" depending on selection
```

### Example 2: List of Amounts

```typescript
import { useCurrencyFormat } from "@/hooks/useCurrencyFormat";

export const ExpenseList = ({ expenses }) => {
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

### Example 3: Input with Currency Symbol

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

// Shows: "৳ [input]" or "$ [input]"
```

## ⚙️ Configuration

### Change Default Currency

Edit `src/constants/currency.ts`:

```typescript
export const DEFAULT_CURRENCY: SupportedCurrency = "USD"; // Change from "BDT"
```

### Add New Currency

Edit `src/constants/currency.ts`:

```typescript
export const SUPPORTED_CURRENCIES = {
   // ... existing currencies
   CHF: { symbol: "CHF", label: "Swiss Franc", code: "CHF" },
} as const;
```

## 🧪 Testing

### Manual Test Steps

1. **Test Selection**
   - Open Profile → Currency
   - Select USD
   - Verify amounts show with "$"

2. **Test Persistence**
   - Select EUR
   - Close app completely
   - Reopen app
   - Verify EUR is still selected

3. **Test Independence**
   - Select USD currency
   - Change language to Bengali
   - Verify currency is still USD (not BDT)

4. **Test Formatting**
   - Test with: 1, 100, 1000, 1000000
   - Test with: 1.5, 0.99, 123.45
   - Verify formatting is correct

## 🐛 Troubleshooting

### Currency not changing?

- Check AsyncStorage permissions
- Verify `setCurrency()` is called
- Check browser console for errors

### Wrong currency showing?

- Clear app cache
- Check AsyncStorage value: `@smart_meal_currency`
- Verify currency code exists in `SUPPORTED_CURRENCIES`

### Formatting looks wrong?

- Check locale settings
- Test with different amounts
- Verify `toLocaleString()` is working

## 📚 Full Documentation

For complete details, see:

- `.kiro/CURRENCY-SYSTEM.md` - Full implementation guide
- `.kiro/CURRENCY-IMPLEMENTATION-SUMMARY.md` - Summary

## ✅ Checklist for Integration

- [ ] Import `useCurrencyFormat` hook
- [ ] Replace hardcoded `৳` with `format()`
- [ ] Replace `toLocaleString()` with `format()`
- [ ] Test with different currencies
- [ ] Test on iOS and Android
- [ ] Verify formatting is correct

---

**Quick Links:**

- 📖 Full Guide: `.kiro/CURRENCY-SYSTEM.md`
- 📝 Summary: `.kiro/CURRENCY-IMPLEMENTATION-SUMMARY.md`
- 🚀 This Guide: `.kiro/CURRENCY-QUICK-START.md`

**Status:** ✅ Production Ready
