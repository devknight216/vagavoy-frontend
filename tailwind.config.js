/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#E5E8DB',
          300: '#D5D8CB',
          500: '#707268',
          700: '#003300'
        },
        orange: {
          100: '#FEFAEF',
          300: '#FDEBB1',
          500: '#FFD276',
          700: '#DFA224'
        }
      },
      boxShadow: {
        '3xl': '0px 4px 40px rgba(229, 232, 219, 0.25)'
      }
    }
  },
  plugins: []
}
