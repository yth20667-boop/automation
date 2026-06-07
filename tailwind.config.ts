import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        // Direction artistique VALON
        noir: {
          DEFAULT: "#0B0B0B",
          50: "#1A1A1A",
          100: "#161616",
          200: "#121212",
          300: "#0F0F0F",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C76B",
          soft: "#D8B65A",
          deep: "#A8851A",
          ink: "#7A5F12",
        },
        cream: {
          DEFAULT: "#F6F1E7",
          dark: "#EAE2D2",
          deeper: "#D9CDB4",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wider2: "0.18em",
      },
      boxShadow: {
        gold: "0 10px 40px -12px rgba(201, 162, 39, 0.45)",
        "gold-lg": "0 24px 80px -20px rgba(201, 162, 39, 0.5)",
        soft: "0 24px 60px -24px rgba(0, 0, 0, 0.6)",
        card: "0 18px 50px -28px rgba(0, 0, 0, 0.55)",
        "inner-gold": "inset 0 0 0 1px rgba(201, 162, 39, 0.35)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E4C76B 0%, #C9A227 45%, #A8851A 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, rgba(201,162,39,0.7) 20%, rgba(228,199,107,1) 50%, rgba(201,162,39,0.7) 80%, transparent)",
        "noir-radial":
          "radial-gradient(ellipse at top, #161616 0%, #0B0B0B 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(-0.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-soft": "pulse-soft 2.2s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        marquee: "marquee 26s linear infinite",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
