/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {
      screens: {
        xxs: "0px", // Double Extra Small Devices
        xs: "360px", // Extra Small Devices
        sm: "480px", // Small Devices
        msm: "576px", // Medium Small Medium Devices
        lsm: "640px", // Large Small Medium Devices
        smd: "768px", // Small Medium Devices
        md: "992px", // Medium Devices
        lg: "1200px", // Large Devices
        xl: "1536px", // Extra Large Devices
        xxl: "1920px", // Double Extra Large Devices
      },
      colors: {
        textColor: "#343436",
        main: "#00AB55",
        primary: "#DEF7EC",
        secondary: "#F1FFF9"
      },
      boxShadow: {
        "3xl": "3px 0px 15px rgba(235, 249, 243, 0.8)"
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      }
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar')
  ]
})