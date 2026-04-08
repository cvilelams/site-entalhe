/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FDF8F0",
          2: "#F0E8DC",
          3: "#E4D8C8",
        },
        espresso: "#1A0F0A",
        brown: {
          DEFAULT: "#6B5344",
          lt: "#9C7E6A",
        },
        terracota: {
          DEFAULT: "#C4622D",
          dark: "#8B3D18",
        },
        "terra-lt": "#E8956A",
        dark: "#0D0705",
        rule: "#D4C4B0",
        fundo: {
          DEFAULT: "#FDF8F0",
          off: "#F0E8DC",
        },
        cinza: "#1A0F0A",
        "verde-musgo": "#C4622D",
        "verde-folha": "#E8956A",
      },
      fontFamily: {
        titulo: ["var(--font-playfair)", "Georgia", "serif"],
        corpo:  ["var(--font-jost)", "system-ui", "sans-serif"],
        sans:   ["var(--font-jost)", "system-ui", "sans-serif"],
        serif:  ["var(--font-playfair)", "Georgia", "serif"],
      },
      fontSize: {
        label:    ["13px", { lineHeight: "1",    letterSpacing: "0.16em", fontWeight: "500" }],
        caption:  ["12px", { lineHeight: "1.65", letterSpacing: "0.05em" }],
        "sm-body":["14px", { lineHeight: "1.65" }],
        body:     ["17px", { lineHeight: "1.75" }],
        h3:       ["20px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h2:       ["36px", { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        h1:       ["54px", { lineHeight: "1.0",  letterSpacing: "-0.03em" }],
        display:  ["54px", { lineHeight: "1.0",  letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        sm:    "2px",
        DEFAULT: "2px",
        md:    "2px",
        lg:    "2px",
        xl:    "2px",
        "2xl": "2px",
        full:  "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
