/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "main-background-color": "var(--main-background-color)",
        "secondary-background-color": "var(--secondary-background-color)",
        "main-green-color": "var(--main-green-color)",
        "white":"var(--main-white-color)"
      },
      backgroundImage: {
        "admin-login-background": "url('./assets/images/matrix.avif')"
      }
    },
  },
  plugins: [],
}