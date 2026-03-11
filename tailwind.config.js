/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          musgo: "#5c946d",
          folha: "#9eb04c",
        },
        terracota: "#c65b2c",
        cinza: "#595959",
        fundo: {
          DEFAULT: "#fcfcfc",
          off: "#f4f0eb",
        },
      },
      fontFamily: {
        titulo: ["var(--font-montserrat)", "sans-serif"],
        corpo: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        label: ["0.68rem", { lineHeight: "1", letterSpacing: "0.22em", fontWeight: "700" }],
        caption: ["0.78rem", { lineHeight: "1.65", letterSpacing: "0.05em" }],
        "sm-body": ["0.85rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.75" }],
        h3: ["1.05rem", { lineHeight: "1.35", letterSpacing: "0.01em" }],
        h2: ["1.45rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h1: ["2.2rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        display: ["3.2rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "8px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.07)",
        btn: "0 4px 16px rgba(92,148,109,0.35)",
        "btn-2": "0 4px 16px rgba(158,176,76,0.35)",
      },
      backgroundImage: {
        "hatch-verde":
          "repeating-linear-gradient(-45deg, rgba(92,148,109,0.10) 0px, rgba(92,148,109,0.10) 1px, transparent 1px, transparent 8px)",
        "hatch-terracota":
          "repeating-linear-gradient(-45deg, rgba(198,91,44,0.08) 0px, rgba(198,91,44,0.08) 1px, transparent 1px, transparent 8px)",
        "cedro-gradient": "linear-gradient(135deg, #c65b2c 0%, #a84a22 30%, #7a3518 60%, #5c946d 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
