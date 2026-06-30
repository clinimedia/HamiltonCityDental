import { Jost } from "next/font/google";

/**
 * Brand typeface from the existing site. Loaded via next/font for zero layout
 * shift and self-hosted delivery (no render-blocking Google Fonts request).
 * Exposed as the CSS variable consumed by tailwind.config.ts (font-sans).
 */
export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jost",
});
