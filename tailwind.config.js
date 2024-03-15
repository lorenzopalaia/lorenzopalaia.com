/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        night: {
          ...require("daisyui/src/theming/themes")["themes"]["night"],
          "primary": "#55D7CF",
          "secondary": "#142D46",
          "accent": "#a8acb7",
          "base-100": "#10172A"
        },
      },
    ],
  },
}

