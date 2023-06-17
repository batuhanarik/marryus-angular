/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width:{'76':'18.5rem'}
    },
    fontFamily:{
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [require("daisyui"), require('@tailwindcss/forms')],
};
