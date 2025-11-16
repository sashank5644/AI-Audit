import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#060A12",
        panel: "#101726",
        ink: "#F4F6FF",
        mute: "#9CA9C7",
        brand: "#7F8EF4",
        brand2: "#4BC5BE",
        good: "#34D399",
        warn: "#FBBF24",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 6px 30px rgba(0,0,0,0.35)",
        glow: "0 0 0 6px rgba(124,140,255,0.12)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(1200px 600px at 10% -10%, rgba(85,100,242,0.18), transparent), radial-gradient(1200px 600px at 90% 110%, rgba(26,164,201,0.12), transparent)",
        grid:
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          xl: "2.5rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
