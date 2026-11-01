import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/feature/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0b0f17",
        surface: {
          DEFAULT: "#111827",
          container: "#181c24",
          card: "rgba(15, 23, 42, 0.75)",
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "Geist", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 20px -3px rgba(6, 182, 212, 0.35)",
        "blue-glow": "0 0 20px -3px rgba(37, 99, 235, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
