/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(20, 21, 39)',
        customColor1: 'rgb(41, 43, 64)',
        customColor2: 'rgb(210, 243, 102)',
      },
      inset: {
        '82': '360px',
        '84': '370px',
        '-84': '-370px',
        '22': '90px'
      },
      height: {
        '100': '396px',
        '110': '450px', 
        '120': '550px',
        '130': '650px',
        '140': '750px',
      },
      width: {
        '100': '396px',  // custom width
        '110': '450px',  // additional custom width
        '120': '575px',
        '130': '600px'
          // extend as needed
      },
    },
  },
  plugins: [],
}
