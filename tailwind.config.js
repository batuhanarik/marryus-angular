/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily:{
      'monaco':['Monaco','system-ui']
    }
  },
  plugins: [require("daisyui")],
};
