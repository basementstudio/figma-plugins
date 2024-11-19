/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}", "./src/*.{html,js,tsx}"],
  theme: {
    fontFamily: {
      mono: `'JetBrains Mono', JetBrains Mono, monospace`,
    },
    extend: {
      colors: {
        "basement-orange": "#ff4d00",
        gray: {
          50: "#f8f8f8",
          100: "#f2f2f2",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
