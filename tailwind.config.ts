import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: "#F5F0E8",
        sumi: "#1C1917",
        urushi: "#6B4E2A",
        kinari: "#A89070",
        shiro: "#E8E0D0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
        jp: ["Noto Serif JP", "serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;

