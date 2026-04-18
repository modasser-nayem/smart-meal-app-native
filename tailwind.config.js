/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {
         colors: {
            // ─── Brand ────────────────────────────────────────────────────
            // Change DEFAULT to rebrand the entire app.
            primary: {
               DEFAULT: "#F59E0B", // amber — main brand
               dark: "#D97706", // pressed state  →  active:bg-primary-dark
            },

            // ─── Surfaces ─────────────────────────────────────────────────
            // All card and page backgrounds.
            background: "#0F172A",
            surface: "#1E293B",
            "surface-container": "#263348",
            "surface-elevated": "#2E3F58", // modals, sheets

            // ─── Text on dark backgrounds ──────────────────────────────────
            "on-surface": "#F8FAFC", // primary text
            "on-primary": "#0F172A", // text on primary-colored elements

            // ─── Borders ──────────────────────────────────────────────────
            outline: "#334155",

            // ─── Semantic status ──────────────────────────────────────────
            success: "#22C55E", // positive / financial surplus
            error: "#EF4444", // negative / danger
            warning: "#F97316", // caution / urgent  (orange, distinct from primary)
            info: "#3B82F6", // informational / neutral

            // ─── Accent ───────────────────────────────────────────────────
            // Live / active / online states.
            // Distinct from success (which means financial positive).
            accent: "#06B6D4", // cyan

            // ─── Secondary (slate grays) ──────────────────────────────────
            // Text hierarchy: 300 = readable label, 400 = muted, 600 = border.
            secondary: {
               DEFAULT: "#94A3B8",
               100: "#E2E8F0",
               200: "#CBD5E1",
               300: "#94A3B8",
               400: "#64748B",
               500: "#475569",
               600: "#334155",
               700: "#1E293B",
               800: "#0F172A",
               900: "#030712",
            },
         },

         fontFamily: {
            regular: ["Inter_400Regular"],
            medium: ["Inter_500Medium"],
            bold: ["Inter_700Bold"],
         },

         borderRadius: {
            DEFAULT: "0.5rem",
            sm: "0.375rem",
            md: "0.5rem",
            lg: "0.75rem",
            full: "9999px",
         },

         spacing: {
            px: "1px",
            0: "0px",
            1: "0.25rem",
            2: "0.5rem",
            3: "0.75rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            8: "2rem",
            10: "2.5rem",
            12: "3rem",
            16: "4rem",
            20: "5rem",
            24: "6rem",
         },
      },
   },
   plugins: [],
};
