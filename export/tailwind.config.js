/** @type {import('tailwindcss').Config} */
export default {
  // The various configurable Tailwind configuration files.
    presets: [
        require('./tailwind.config.stataroid.js'),
    ],
    content: [
        "./resources/**/*.antlers.html",
        "./resources/**/*.antlers.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.vue",
        "./content/**/*.md",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#00e6f5",
                secondary: "#f700f4",
                tertiary: "#000",
                quaternary: "#808080",
            },
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
