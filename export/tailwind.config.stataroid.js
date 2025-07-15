import themeColors from "./resources/data/themeColours.json" assert { type: "json" };

const generateOpacityClasses = (prefix, colors) => {
    const classes = [];
    for (let i = 0; i <= 100; i += 10) {
        colors.forEach((color) => {
            classes.push(`${prefix}-[${color}]/${i}`);
        });
    }
    return classes;
};

const generateStaticOpacityClasses = (prefix) => {
    const classes = [];
    for (let i = 10; i <= 100; i += 10) {
        classes.push(`${prefix}-opacity-${i}`);
    }
    return classes;
};

export default {
    safelist: [
        ...generateStaticOpacityClasses("bg"),
        ...generateOpacityClasses("from", themeColors),
        ...generateOpacityClasses("to", themeColors),
        ...themeColors.map((c) => `bg-[${c}]`),
        ...themeColors.map((c) => `text-[${c}]`),
        ...themeColors.map((c) => `border-[${c}]`),
    ],
};
