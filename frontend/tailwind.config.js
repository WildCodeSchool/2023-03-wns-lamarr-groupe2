/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "primary-dark": "#000000",
      "secondary-dark": "#706565",
      "tertiary-dark": "#A59999",
      "main-bg": "#FFFCF6",
      "element-bg": "#FFFCF6",
      "primary-danger": "#CE7677",
      "primary-attention": "#FFCB66",
      "primary-good": "#96B9A0",
      white: "#fff",
      black: "#000",
    },
    fontFamily: {
      titles: ["Montserrat", "sans-serif"],
      content: ["Open Sans", "sans-serif"],
    },
    extend: {
      spacing: {},
      borderRadius: {
        small: 4,
        medium: 6,
        large: 8,
        xlarge: 10,
        rounder: 25,
      },
      borderWidth: {
        1: "1px",
      },
      dropShadow: {
        custom: "5px 6px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
