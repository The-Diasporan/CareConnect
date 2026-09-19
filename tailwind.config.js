/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware tokens driven by CSS variables so that
        // opacity utilities (text-ink/60, bg-ink/5, border-line/10) adapt
        // automatically between light and dark mode.
        cream: "rgb(var(--cream) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        warm: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 118, 110, 0.08)",
        card: "0 1px 3px rgba(31, 42, 55, 0.06), 0 8px 24px -8px rgba(31, 42, 55, 0.10)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(234, 88, 12, 0.45)" },
          "70%": { boxShadow: "0 0 0 10px rgba(234, 88, 12, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(234, 88, 12, 0)" },
        },
        // Direction-aware slide transitions for the presentation deck.
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translate3d(4%, 0, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translate3d(-4%, 0, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translate3d(0, 12px, 0) scale(0.99)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "pulse-ring": "pulse-ring 2s infinite",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-in-left": "slide-in-left 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "rise-in": "rise-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
