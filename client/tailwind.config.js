/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          1: "#1c1f2e",
          2: "#161925",
        },
      },
    },
  },
  plugins: [],
};
