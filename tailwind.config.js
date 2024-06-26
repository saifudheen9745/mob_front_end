/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "primary-background-color": "var(--primary-background-color)",
        "secondary-background-color": "var(--secondary-background-color)",
        "primary-green-color": "var(--primary-green-color)",
        "white":"var(--primary-white-color)",
        "primary-text-color": "var(--primary-text-color)"
      },
      backgroundImage: {
        "admin-login-background": "url('./assets/images/matrix.avif')"
      }
    },
  },
  plugins: [],
}