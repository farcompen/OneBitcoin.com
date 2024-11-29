/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs':'300px',
      },
      fontSize:{
        'xs':'0.65rem'},
     
    },
  },
  plugins: [],
}