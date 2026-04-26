import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        acid: "#00ff88",
        acid2: "#00e5ff",
        background: "#020408",
        surface: "rgba(0,255,136,0.04)",
        border: "rgba(0,255,136,0.15)",
        foreground: "#e8f4f0",
        muted: "#4a6a5a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Orbitron", "monospace"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        blink: "blink 1.5s infinite",
        pulse: "pulse 1.8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        shine: "shine 3s linear infinite",
        fadeUp: "fadeUp 0.5s ease both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(0,255,136,0.4)" },
          "50%": { boxShadow: "0 4px 50px rgba(0,255,136,0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
