/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      linearGradientColors: {
        "pink-gradient": ["#FF61D2", "#FE9090"],
      },
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-300": "#EBEBEB",

        "primary-100": "#FFE1E0",
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "primary-600": "#801914",
        "primary-700": "#610804",
      },

      backgroundImage: (theme) => ({
        "gradient-yellowred": "linear-gradient(90deg,#FF616A 0%,#FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".inset-shadow": {
          boxShadow:
            "0 5px 6px rgba(0,0,0,.7), 0 5px 15px rgba(0,0,0,.1),inset 0 0 10px rgba(0,0,0,.5)",
        },
      };

      addUtilities(newUtilities, ["responsive", "Active", "hover", "focus"]);
    },
  ],
};
