const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      orange: colors.orange,
      amber: colors.amber,
      gray: colors.coolGray,
      red: colors.red,
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      green: colors.green,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      violet: colors.violet,
      black: colors.black,
      white: colors.white,
    },
    extend: {
      colors: {
        "theme-black": "#1A1A1D",
        "theme-maroon": "#6F2232",
        "theme-pink": "#950740",
        "theme-red": "#C3073F",
        palewhite: "#fafafa",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
