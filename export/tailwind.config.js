/** @type {import('tailwindcss').Config} */
import themeColors from "./resources/data/themeColours.json" assert { type: "json" };
import themeFont from "./resources/data/themeFont.json" assert { type: "json" };

const [
    primary,
    secondary,
    tertiary,
    quaternary,
    white,
    lightGrey,
    darkGrey,
    black,
] = themeColors;

const colors = {
    primary,
    secondary,
    tertiary,
    quaternary,
    white,
    lightGrey,
    darkGrey,
    black,
};

export default {
    // The various configurable Tailwind configuration files.
    presets: [require("./tailwind.config.stataroid.js")],
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
                ...colors, // resources/data/themeColours.json
            },
            fontFamily: {
                ...themeFont, // resources/data/themeFont.json
            },
            animation: {
                "full-tl": "marquee-left 40s linear infinite",
                "full-tr": "marquee-right 40s linear infinite",
            },
            keyframes: {
                "marquee-left": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                "marquee-right": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
