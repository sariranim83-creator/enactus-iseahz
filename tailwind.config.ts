import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        enactus: {
          yellow: "#FFC72C",
          "yellow-dark": "#E6AD00",
          black: "#0A0A0A",
          "off-black": "#141414",
          white: "#FFFFFF",
          "off-white": "#FAFAF8",
          gray: {
            50: "#F7F7F5",
            100: "#EDEDEA",
            200: "#D8D8D3",
            300: "#B4B4AC",
            400: "#8A8A80",
            500: "#666660",
            600: "#4A4A45",
            700: "#333330",
            800: "#212120",
            900: "#141412",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
