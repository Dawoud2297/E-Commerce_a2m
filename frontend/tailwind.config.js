/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        "dark-1": "#000000",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "dark-5": "#1D1D1D",
        "dark-6": "#191919",
        "dark-7": "#535353",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#7878A3",
        "light-4": "#5C5C7B",
        "pink-1": "#eabfb2",
        "pink-1-1": "#895e6a",
        "pink-2": "#d28678",
        "pink-3": "#bb6f66",
        "pink-4": "#fdaf93",
        "pink-5": "#fec1aa",
        "pink-6": "#ddc6ba",
        "green-1": "#2c7533",
        "green-2": "#1c5421",
        "green-3": "#09220b",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(to right, #2563eb, #3b82f6, #1f2937, #111827)",
      },
      keyframes: {
        loadingLogo: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOutUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        fadeOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
      },
      backgroundSize: {
        "200%": "200%",
      },
      animation: {
        gradient: "loadingLogo 3s ease infinite",
        fadeInDown: 'fadeInDown 0.5s ease-out forwards',
        fadeOutUp: 'fadeOutUp 0.5s ease-in forwards',
        fadeOutRight: 'fadeOutRight 0.5s ease-in forwards',
      },
      letterSpacing: {
        tightest: "-.105em",
      },
    },
  },
  plugins: [],
};
