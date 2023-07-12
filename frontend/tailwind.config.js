/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      xxl: "1536px",
    },
    colors: {
      "primary-dark": "#000000",
      "secondary-dark": "#706565",
      "tertiary-dark": "#A59999",
      "main-bg": "#FFFCF6",
      "element-bg": "#FFFFFF",
      "primary-danger": "#CE7677",
      "primary-attention": "#FFCB66",
      "primary-good": "#96B9A0",
      "main-grey": "#D9D9D9",
      white: "#fff",
      black: "#000",
    },
    fontFamily: {
      titles: ["Montserrat", "sans-serif"],
      content: ["Open Sans", "sans-serif"],
      button: ["Rowdies", "sans-serif"],
    },
    fontSize: {
      "main-title": 40,
      "secondary-title": 28,
      "small-p": 12,
      "main-p": 18,
      button: 20,
    },
    extend: {
      spacing: {},
      borderRadius: {
        small: 4,
        medium: 6,
        large: 8,
        xlarge: 10,
        customBtn: 12,
        rounder: 25,
      },
      borderWidth: {
        1: "1px",
      },
      dropShadow: {
        custom: "5px 6px 0px rgba(0, 0, 0, 1)",
        progressbar: "3px 4px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
