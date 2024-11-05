/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        lg: "312px",
      },
    },
    extend: {
      screens: {
        "1830px": "1830px",
      },
      maxWidth: {
        "1296px": "1296px",
        "1200px": "1200px",
        "max-1200px": { max: "1200px" },
        "min-1200px": { min: "1200px" },
      },
      colors: {
        primary: {
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          950: "var(--secondary-950)",
        },
        background: {
          y: "var(--background-y)",
          2: "var(--background-2)",
          blur: "var(--background-blur)",
        },
        grey: {
          100: "var(--grey-100)",
          400: "var(--grey-400)",
          600: "var(--grey-600)",
          950: "var(--grey-950)",
        },
        blue: {
          50: "var(--blue-50)",
        },
      },
      fontFamily: {
        sans: ["Noto Sans TC", "sans-serif"],
      },
      dropShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
      },
      cursor: {
        // Define a custom cursor style
        pointer: "pointer",
        custom: "url(/images/parismap_dist_web.png), auto",
      },
      letterSpacing: {
        1.5: "1.5px",
        4: "4%",
      },
      grayscale: {
        120: "120%",
        240: "240%",
      },
    },
  },
  plugins: [],
};
