/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          // Assuming a serif font is used based on the code's styling
          serif: ['Georgia', 'serif'], 
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          'dark-green': '#034225',
          'golden-yellow': '#f9b000',
          'cream': '#f8f5e3',
        }
      },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
     ],
  }