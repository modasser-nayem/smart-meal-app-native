import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── English ──────────────────────────────────────────────────────────────────
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enMeals from "./locales/en/meals.json";
import enExpense from "./locales/en/expense.json";
import enGroup from "./locales/en/group.json";
import enProfile from "./locales/en/profile.json";

// ─── Bengali ──────────────────────────────────────────────────────────────────
import bnCommon from "./locales/bn/common.json";
import bnHome from "./locales/bn/home.json";
import bnMeals from "./locales/bn/meals.json";
import bnExpense from "./locales/bn/expense.json";
import bnGroup from "./locales/bn/group.json";
import bnProfile from "./locales/bn/profile.json";

// ─── Hindi ────────────────────────────────────────────────────────────────────
import hiCommon from "./locales/hi/common.json";
import hiHome from "./locales/hi/home.json";
import hiMeals from "./locales/hi/meals.json";
import hiExpense from "./locales/hi/expense.json";
import hiGroup from "./locales/hi/group.json";
import hiProfile from "./locales/hi/profile.json";

// ─── Supported languages ──────────────────────────────────────────────────────

export const SUPPORTED_LANGUAGES = {
   en: { label: "English", nativeLabel: "English", flag: "🇬🇧" },
   bn: { label: "Bengali", nativeLabel: "বাংলা", flag: "🇧🇩" },
   hi: { label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
export const LANGUAGE_STORAGE_KEY = "@smart_meal_language";

// ─── Resources ────────────────────────────────────────────────────────────────

const resources = {
   en: {
      common: enCommon,
      home: enHome,
      meals: enMeals,
      expense: enExpense,
      group: enGroup,
      profile: enProfile,
   },
   bn: {
      common: bnCommon,
      home: bnHome,
      meals: bnMeals,
      expense: bnExpense,
      group: bnGroup,
      profile: bnProfile,
   },
   hi: {
      common: hiCommon,
      home: hiHome,
      meals: hiMeals,
      expense: hiExpense,
      group: hiGroup,
      profile: hiProfile,
   },
};

// ─── Language detection ───────────────────────────────────────────────────────

/**
 * Resolves the initial language:
 * 1. User's saved preference (AsyncStorage)
 * 2. Device locale (expo-localization)
 * 3. Default fallback (English)
 */
export const resolveInitialLanguage = async (): Promise<SupportedLanguage> => {
   try {
      // 1. Check saved preference
      const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && saved in SUPPORTED_LANGUAGES) {
         return saved as SupportedLanguage;
      }

      // 2. Check device locale
      const deviceLocale = Localization.getLocales()[0]?.languageCode ?? "";
      const deviceLang = deviceLocale.split("-")[0].toLowerCase();
      if (deviceLang in SUPPORTED_LANGUAGES) {
         return deviceLang as SupportedLanguage;
      }
   } catch {
      // Silently fall through to default
   }

   return DEFAULT_LANGUAGE;
};

/**
 * Persists the user's language choice and changes the active language.
 * Call this when the user selects a language in the Profile settings.
 */
export const changeLanguage = async (lang: SupportedLanguage): Promise<void> => {
   await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
   await i18n.changeLanguage(lang);
};

// ─── i18next init ─────────────────────────────────────────────────────────────

i18n.use(initReactI18next).init({
   resources,
   lng: DEFAULT_LANGUAGE, // overridden in app bootstrap
   fallbackLng: DEFAULT_LANGUAGE, // always fall back to English
   defaultNS: "common", // default namespace when none specified
   ns: ["common", "home", "meals", "expense", "group", "profile"],

   interpolation: {
      escapeValue: false, // React Native handles XSS
   },

   // Pluralization: i18next uses _plural suffix by default
   // e.g. "key": "{{count}} item" / "key_plural": "{{count}} items"
   pluralSeparator: "_",

   // Missing key handling — logs in dev, silent in prod
   saveMissing: __DEV__,
   missingKeyHandler: __DEV__
      ? (lngs, ns, key) => {
           console.warn(`[i18n] Missing key: ${ns}:${key} for [${lngs.join(", ")}]`);
        }
      : undefined,
});

export default i18n;
