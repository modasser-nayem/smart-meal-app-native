/**
 * Type-safe i18n key definitions.
 *
 * These types are derived from the English locale files (the source of truth).
 * TypeScript will error if you use a key that doesn't exist in the JSON files.
 *
 * Usage:
 *   const { t } = useTranslation('home');
 *   t('greeting.morning')          // ✅ type-safe
 *   t('greeting.nonexistent')      // ❌ TypeScript error
 */

import type enCommon from "./locales/en/common.json";
import type enHome from "./locales/en/home.json";
import type enMeals from "./locales/en/meals.json";
import type enExpense from "./locales/en/expense.json";
import type enGroup from "./locales/en/group.json";
import type enProfile from "./locales/en/profile.json";

// Extend react-i18next's type system
declare module "i18next" {
   interface CustomTypeOptions {
      defaultNS: "common";
      resources: {
         common: typeof enCommon;
         home: typeof enHome;
         meals: typeof enMeals;
         expense: typeof enExpense;
         group: typeof enGroup;
         profile: typeof enProfile;
      };
   }
}
