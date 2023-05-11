/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Lato', sans-serif;",
        lato: "Poppins', sans-serif;",
      },
    },
  },
  plugins: [],
};
