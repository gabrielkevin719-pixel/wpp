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
        background: "#ffffff",
        foreground: "#0f172a",
        muted: "#64748b",
        "muted-foreground": "#94a3b8",
        border: "#e2e8f0",
        primary: "#0f172a",
        "primary-foreground": "#ffffff",
        accent: "#f1f5f9",
        success: "#10b981",
        card: "#ffffff",
        "card-foreground": "#0f172a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 24px rgba(0, 0, 0, 0.06)",
        medium: "0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.08)",
        strong: "0 8px 24px rgba(0, 0, 0, 0.12), 0 16px 48px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
