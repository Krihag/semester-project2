/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.js"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: " #201233",
        secondary: "#201233",

        pinker: "#bb78b6",
        lighterPurple: "#3B2952",
        modalBg: "#28193E",
        cta: "#FF8B66",
      },
    },
  },
  // variants: {
  //   extend: {
  //     opacity: ["group-hover"],
  //   },
  // },
};
