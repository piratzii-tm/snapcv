/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Text colors - Handle all color shades
    {
      pattern:
        /^text-(blue|red|green|yellow|purple|pink|orange|teal)-(50|100|200|300|400|500|600|700|800|900)$/,
    },

    // Background colors - Handle all color shades
    {
      pattern:
        /^bg-(blue|red|green|yellow|purple|pink|orange|teal)-(50|100|200|300|400|500|600|700|800|900)$/,
    },

    // Border colors - Handle all color shades
    {
      pattern:
        /^border-(blue|red|green|yellow|purple|pink|orange|teal)-(50|100|200|300|400|500|600|700|800|900)$/,
    },

    // Font families
    {
      pattern: /^font-(poppins|raleway|roboto|lato|montserrat|openSans)$/,
    },

    // Hover states for all color variations
    {
      pattern:
        /^hover:(text|bg|border)-(blue|red|green|yellow|purple|pink|orange|teal)-(50|100|200|300|400|500|600|700|800|900)$/,
    },

    // Focus states for all color variations
    {
      pattern:
        /^focus:(text|bg|border)-(blue|red|green|yellow|purple|pink|orange|teal)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...fontFamily.sans],
        roboto: ["Roboto", ...fontFamily.sans],
        lato: ["Lato", ...fontFamily.sans],
        montserrat: ["Montserrat", ...fontFamily.sans],
        openSans: ["Open Sans", ...fontFamily.sans],
        raleway: ["Raleway", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
