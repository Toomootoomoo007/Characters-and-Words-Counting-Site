import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        // 16列まで増やす
        "16": "repeat(16, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "minmax-100-auto": "minmax(100px, auto)",
      },
      spacing: {
        "128": "32rem",
        "256": "64rem",
        "512": "128rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
