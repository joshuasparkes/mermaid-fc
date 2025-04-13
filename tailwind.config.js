/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // {{ Define font families using the CSS variables created by next/font }}
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Use Inter as the default sans-serif
        heading: ["var(--font-poppins)", "sans-serif"], // Use Poppins for headings
      },
      // You can extend other theme properties here if needed
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
