# i18n Quick Reference Guide

## What Was Done

All hardcoded strings in the Smart Meal App have been replaced with i18n translations. The app now supports:

- 🇬🇧 English (en)
- 🇧🇩 Bengali (bn)
- 🇮🇳 Hindi (hi)

## How to Switch Languages

**In the App:**

1. Open Profile tab
2. Scroll to Settings section
3. Tap "Language Selector"
4. Choose your language
5. Language preference is saved automatically

## Files Translated (15 Total)

### Meals Tab

- `LogMealSheet.tsx` - Log meal dialog
- `MonthlyAnalytics.tsx` - Monthly view with export
- `MonthYearPicker.tsx` - Month/year selector
- `MembersMealParticipation.tsx` - Member meal stats

### Group Tab

- `GroupInfoCard.tsx` - Group header info
- `GroupRequestsSection.tsx` - Join requests & invitations
- `AcceptRequestModal.tsx` - Accept member dialog
- `MemberInfoModal.tsx` - Member details
- `NoticeDetailModal.tsx` - Notice viewer
- `PostNoticeSheet.tsx` - Post notice dialog

### Expense Tab

- `AddExpenseSheet.tsx` - Add expense dialog
- `ExpenseBreakdown.tsx` - Expense breakdown
- `RecentTransactions.tsx` - Transaction list

### Tab Screens

- `src/app/(tabs)/expense/index.tsx` - Expense tab alerts
- `src/app/(tabs)/group/index.tsx` - Group tab alerts

## Translation Files

Located in `src/i18n/locales/`:

```
src/i18n/locales/
├── en/                    # English (100% complete)
│   ├── common.json
│   ├── home.json
│   ├── meals.json
│   ├── expense.json
│   ├── group.json
│   └── profile.json
├── bn/                    # Bengali (needs translation)
│   └── [same structure]
└── hi/                    # Hindi (needs translation)
    └── [same structure]
```

## How to Add Translations

### For Developers

**Using translations in a component:**

```typescript
import { useTranslation } from "react-i18next";

export const MyComponent = () => {
   const { t } = useTranslation("meals");  // namespace

   return (
      <Typography>
         {t("logMeal.title")}  // "Log Meal"
      </Typography>
   );
};
```

**Translation key structure:**

```json
{
   "logMeal": {
      "title": "Log Meal",
      "subtitle": "Set quantities for each meal"
   }
}
```

### For Translators

**To translate Bengali or Hindi:**

1. Open `src/i18n/locales/bn/meals.json` (or other files)
2. Replace English text with Bengali/Hindi translation
3. Keep the JSON structure exactly the same
4. Example:

```json
{
   "logMeal": {
      "title": "খাবার লগ করুন", // Bengali
      "subtitle": "প্রতিটি খাবারের পরিমাণ সেট করুন"
   }
}
```

## Key Translation Namespaces

| Namespace | Purpose                             | File           |
| --------- | ----------------------------------- | -------------- |
| `common`  | Shared actions (Save, Cancel, etc.) | `common.json`  |
| `home`    | Home tab strings                    | `home.json`    |
| `meals`   | Meals tab strings                   | `meals.json`   |
| `expense` | Expense tab strings                 | `expense.json` |
| `group`   | Group tab strings                   | `group.json`   |
| `profile` | Profile tab strings                 | `profile.json` |

## Advanced Features

### Pluralization

```typescript
// In JSON:
{
   "summary": {
      "members": "{{count}} member",
      "members_plural": "{{count}} members"
   }
}

// In component:
t("summary.members", { count: 5 })  // "5 members"
t("summary.members", { count: 1 })  // "1 member"
```

### Variable Interpolation

```typescript
// In JSON:
{
   "picker": {
      "apply": "Apply — {{month}} {{year}}"
   }
}

// In component:
t("picker.apply", { month: "April", year: 2026 })
// Result: "Apply — April 2026"
```

## Adding a New Language

1. Create folder: `src/i18n/locales/[code]/`
   - Example: `src/i18n/locales/es/` for Spanish

2. Copy all 6 JSON files from `en/` folder

3. Translate all strings

4. Update `src/i18n/index.ts`:

   ```typescript
   import esCommon from "./locales/es/common.json";
   // ... import other files

   export const SUPPORTED_LANGUAGES = {
      en: { label: "English", nativeLabel: "English", flag: "🇬🇧" },
      bn: { label: "Bengali", nativeLabel: "বাংলা", flag: "🇧🇩" },
      hi: { label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
      es: { label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" }, // NEW
   };

   const resources = {
      en: {
         /* ... */
      },
      bn: {
         /* ... */
      },
      hi: {
         /* ... */
      },
      es: {
         // NEW
         common: esCommon,
         home: esHome,
         // ... etc
      },
   };
   ```

5. Update `src/i18n/types.ts` if needed for TypeScript support

## Testing Translations

1. **Test in App:**
   - Switch language in Profile → Language Selector
   - Verify all strings display correctly
   - Check for text overflow or layout issues

2. **Test on Device:**
   - Test on both iOS and Android
   - Test with different screen sizes
   - Verify RTL languages (if added) display correctly

3. **Check Missing Keys:**
   - Look for console warnings about missing translation keys
   - All keys should be defined in JSON files

## Common Issues & Solutions

### Issue: Translation not showing

**Solution:**

- Check namespace is correct: `useTranslation("meals")`
- Verify key exists in JSON file
- Check for typos in key path

### Issue: Text overflow

**Solution:**

- Adjust component width/padding
- Use `numberOfLines` prop on Typography
- Test with longest language (usually German/Hindi)

### Issue: Language not changing

**Solution:**

- Check AsyncStorage permissions
- Verify `changeLanguage()` is called
- Check browser console for errors

## Performance Notes

✅ **Optimized:**

- Translations loaded once at app startup
- No runtime parsing of JSON
- Memoized translation function
- Lazy loading of language files

## Support

For questions about translations:

1. Check `src/i18n/index.ts` for setup
2. Review `src/i18n/types.ts` for TypeScript types
3. Check existing component examples
4. Refer to [react-i18next docs](https://react.i18next.com/)

---

**Last Updated:** April 18, 2026
**Status:** ✅ Production Ready
