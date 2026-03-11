/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdf8ee",
          100: "#f9edcc",
          200: "#f2d88a",
          300: "#e8b96a",
          400: "#C8973A",
          500: "#A07020",
          600: "#7a5418",
          700: "#5a3d12",
          800: "#3d290d",
          900: "#1f1507",
        },
        dark: {
          DEFAULT: "#0a0a0a",
          100: "#111111",
          200: "#1a1a1a",
          300: "#222222",
          400: "#2d2d2d",
          500: "#3a3a3a",
        },
      },
      fontFamily: {
        cairo:     ["Cairo", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        playfair:  ["Playfair Display", "serif"],
      },
      animation: {
        "fade-in":    "fadeIn 0.8s ease forwards",
        "slide-up":   "slideUp 0.8s ease forwards",
        "slide-down":  "slideDown 0.5s ease forwards",
        "shimmer":    "shimmer 2s infinite",
        "pulse-gold": "pulseGold 2s infinite",
        "float":      "float 3s ease-in-out infinite",
        "spin-slow":  "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:   { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown: { "0%": { opacity: "0", transform: "translateY(-20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        pulseGold: { "0%,100%": { boxShadow: "0 0 0 0 rgba(200,151,58,0.4)" }, "50%": { boxShadow: "0 0 0 15px rgba(200,151,58,0)" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      backgroundImage: {
        "gold-gradient":   "linear-gradient(135deg, #7a5418, #C8973A, #E8B96A)",
        "gold-gradient-h": "linear-gradient(90deg, #7a5418, #C8973A, #E8B96A)",
        "dark-gradient":   "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
      },
      boxShadow: {
        "gold-sm": "0 2px 8px rgba(200,151,58,0.2)",
        "gold-md": "0 4px 20px rgba(200,151,58,0.3)",
        "gold-lg": "0 8px 40px rgba(200,151,58,0.4)",
        "gold-xl": "0 16px 60px rgba(200,151,58,0.5)",
        "dark-lg": "0 20px 60px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
