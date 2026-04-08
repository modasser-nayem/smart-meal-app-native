import Constants from "expo-constants";

/**
 * App Configuration
 */
export const Config = {
   API_URL:
      Constants.expoConfig?.extra?.apiUrl ??
      process.env.EXPO_PUBLIC_API_URL ??
      "http://localhost:3000/api",
   ENV: Constants.expoConfig?.extra?.env ?? "dev",
   TIMEOUT: 15000,
   MAX_RETRIES: 2,
};

export type AppConfig = typeof Config;
