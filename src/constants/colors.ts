/**
 * SMART MEAL — COLOR CONSTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * Use these ONLY for JavaScript props that can't use Tailwind classNames:
 *   - MaterialCommunityIcons  color={Colors.icon.primary}
 *   - TextInput               placeholderTextColor={Colors.placeholder}
 *   - Inline styles           style={{ backgroundColor: Colors.background }}
 *   - Tab bar config          tabBarActiveTintColor: Colors.primary
 *
 * For everything else (bg-*, text-*, border-*) use Tailwind classNames directly.
 *
 * To retheme: update this file + tailwind.config.js (both must stay in sync).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const Colors = {
   // ── Brand ──────────────────────────────────────────────────────────────
   primary: "#F59E0B", // amber — main brand color
   primaryDark: "#D97706", // pressed state (used in active:bg-primary-dark)

   // ── Surfaces ───────────────────────────────────────────────────────────
   background: "#0F172A", // page background (used in contentStyle, tabBar)

   // ── Text on colored backgrounds ────────────────────────────────────────
   onSurface: "#F8FAFC", // primary text (used in loaderColors)
   onPrimary: "#0F172A", // text/icons ON primary buttons (FAB, active tab)

   // ── Secondary label shade ──────────────────────────────────────────────
   textSubtle: "#94A3B8", // tab bar inactive tint

   // ── Icon tints ─────────────────────────────────────────────────────────
   // Use in color={} props on MaterialCommunityIcons only.
   icon: {
      primary: "#F59E0B", // accent / brand icons
      onDark: "#F8FAFC", // icons on dark backgrounds (header, nav bar)
      onPrimary: "#0F172A", // icons on primary-colored buttons (FAB)
      muted: "#334155", // chevrons, inactive / decorative icons
      subtle: "#94A3B8", // close buttons, eye-toggle, secondary icons
      dim: "#64748B", // meta info, tertiary icons
      success: "#22C55E", // positive / financial surplus
      error: "#EF4444", // negative / danger
      warning: "#F97316", // caution / urgent (orange, distinct from primary)
      info: "#3B82F6", // informational / neutral
      accent: "#06B6D4", // live / active / online (cyan)
   },

   // ── Input ──────────────────────────────────────────────────────────────
   placeholder: "#64748B", // TextInput placeholderTextColor
} as const;
