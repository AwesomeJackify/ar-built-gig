/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        koulen: ["Koulen", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        cmyk: {
          ...require("daisyui/src/theming/themes")["cmyk"],
          primary: "#3E2723",
          secondary: "#D7CCC8",
          accent: "#BCAAA4",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
