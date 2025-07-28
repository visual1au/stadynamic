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
        ...themeColors.map((c) => `hover:text-[${c}]`),
        ...themeColors.map((c) => `border-[${c}]`),
        ...Array.from({ length: 33 }, (_, i) => `size-${i}`).filter((c) =>
            [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32,
            ].includes(parseInt(c.replace("size-", ""))),
        ),
        ...Array.from({ length: 33 }, (_, i) => `w-${i}`).filter((c) =>
            [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32,
            ].includes(parseInt(c.replace("w-", ""))),
        ),
        ...Array.from({ length: 33 }, (_, i) => `h-${i}`).filter((c) =>
            [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32,
            ].includes(parseInt(c.replace("h-", ""))),
        ),
    ],
};
