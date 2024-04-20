/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'poppins' : 'Poppins, sans-serif',
        'rubik' : 'Rubik',
        'montserrat' : 'Montserrat, sans-serif',
        'futura' : 'Futura, sans-serif'
      },
      colors : {
        'pink' : '#E26EE5',
        'purple' : '#7E30E1',
        'dark-purple' : '#49108B',
        'dark-slate' : '#0B212F',
        'medium-blue' : '#1363DF',
        'light-blue' : '#47B5FF',
        'dark-white' : '#DFF6FF',
        'dark-wisdom' : '#1A374D',
        'medium-wisdom' : '#406882',
        'light-wisdom' : '#6998AB',
        'white-wisdom' : '#ADCBD7',
        'purple-wisdom' : '#9A55F3',
        'dark-lime' : '#8BFCAC',
        'lime' : '#C9F67F',
      },
      backgroundImage: {
        'hero': "url('/public/BG.png')",
      }
    },
  },
  plugins: [],
}

