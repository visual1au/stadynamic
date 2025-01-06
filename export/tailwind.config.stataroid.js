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

const colors = ["#00e6f5", "#f700f4", "#808080", "#ffffff", "#000"];

export default {
    safelist: [
        ...generateStaticOpacityClasses("bg"), // Static bg-opacity classes
        ...generateOpacityClasses("from", colors), // Gradient starting colors with opacity
        ...generateOpacityClasses("to", colors), // Gradient ending colors with opacity
        ...colors.map((color) => `bg-[${color}]`), // Background colors
        ...colors.map((color) => `text-[${color}]`), // Text colors
        "grid-cols-4", // Static class
    ],
};
