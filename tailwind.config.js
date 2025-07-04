/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#5B21B6",
        "primary-foreground": "#F5F3FF",
        secondary: "#7C3AED",
        "secondary-foreground": "#FAF5FF",
        destructive: "#DC2626",
        background: "#0F0F1A",
        foreground: "#EDE9FE",
        accent: "#4C1D95",
        "accent-foreground": "#E0E7FF",
        ring: "#8B5CF6",
        input: "#1C1C2D",
        muted: "#312E81",
        border: "#3F3F46",
      },
    },
  },
  plugins: [],
};
