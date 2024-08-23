/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#0096b2', // cian
        'primary-dark': '#007a91', // cian oscuro
        'primary-light': '#00b4d6', // cian claro
        secondary: '#0998FC', // azul
        'secondary-dark': '#0976FC', // azul oscuro
        'secondary-light': '##09C0FC', // azul claro
        accent: '#ffc107', // ámbar
        'accent-dark': '#cc9a06', // ámbar oscuro
        'accent-light': '#ffca28', // ámbar claro
        neutral: '#f5f5f5', // gris claro
        'neutral-dark': '#e0e0e0', // gris
        'neutral-light': '#fafafa', // gris más claro
      },
    },
  },
  plugins: [],
}

