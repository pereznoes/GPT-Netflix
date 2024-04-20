/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg":
          "url(./src/assets/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
      },
      width: {
        "header-w-1": "calc(66.66666666% - 1rem)",
      },
    },
  },
  plugins: [],
};
