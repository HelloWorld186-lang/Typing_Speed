/** @type {import('tailwindcss').Config}*/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '540px'},
      },
      colors: {
        'special_green': 'rgb(146,255,216)',
        'special_black' : 'rgb(18,23,22)',
        'special_red' : 'rgb(231 , 91 , 91)',
      },
    },
  },
  plugins: [],
};
