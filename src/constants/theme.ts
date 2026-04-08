export const palette = {
   navy: {
      "50": "#F8FAFC",
      "100": "#F1F5F9",
      "800": "#1E293B",
      "900": "#0F172A",
      "950": "#020617",
   },
   amber: {
      "400": "#FBBF24",
      "500": "#F59E0B",
      "600": "#D97706",
   },
   slate: {
      "400": "#94A3B8",
      "500": "#64748B",
      "600": "#475569",
      "700": "#334155",
   },
   status: {
      success: "#22C55E",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
   },
} as const;

export const darkTheme = {
   background: palette.navy["900"], // #0F172A
   surface: palette.navy["800"], // #1E293B
   surfaceAlt: "#263348",
   border: palette.slate["700"],
   accent: palette.amber["500"], // #F59E0B
   accentLight: palette.amber["400"],
   textPrimary: "#F8FAFC",
   textSecondary: palette.slate["400"],
   textMuted: palette.slate["600"],
   ...palette.status,
} as const;

export const lightTheme = {
   background: palette.navy["50"],
   surface: "#FFFFFF",
   surfaceAlt: palette.navy["100"],
   border: "#E2E8F0",
   accent: palette.amber["500"],
   accentLight: palette.amber["600"],
   textPrimary: palette.navy["900"],
   textSecondary: palette.slate["500"],
   textMuted: palette.slate["400"],
   ...palette.status,
} as const;

export type Theme = typeof darkTheme;
