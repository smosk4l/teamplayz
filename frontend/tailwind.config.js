/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Lato', sans-serif;",
        lato: "Poppins', sans-serif;",
      },
      backgroundColor: {
        "black-button": "#303030",
      },
      textColor: {
        link: "#787F84",
        "black-link": "#303030",
      },
      screens: {
        lx: "910px",
      },
    },
  },
  plugins: [],
};
