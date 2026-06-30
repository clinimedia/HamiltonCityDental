import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette captured from the existing hamiltoncitydental.ca site.
        brand: {
          // Accent primary — sky blue
          DEFAULT: "#74d5ff",
          hover: "#4bc9ff",
          // Neutrals
          ink: "#0d0f13", // primary text / dark surfaces
          "ink-soft": "#1d1f24", // secondary dark
          inverse: "#f0f7ff", // light surface / on-dark text
        },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "Jost", "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "80rem", // 1280px content width
      },
    },
  },
  plugins: [],
};

export default config;
