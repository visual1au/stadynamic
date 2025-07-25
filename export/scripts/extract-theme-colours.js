import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

// Get the real path of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build absolute paths
const globalDataFile = path.resolve(
    __dirname,
    "../content/globals/theme_settings.yaml",
);
const outputFile = path.resolve(
    __dirname,
    "../resources/data/themeColours.json",
);

// Read YAML
const yamlContent = fs.readFileSync(globalDataFile, "utf8");
const themeSettings = yaml.load(yamlContent);

// Keys to extract
const keys = [
    "primary",
    "secondary",
    "tertiary",
    "quaternary",
    "white",
    "lightGrey",
    "darkGrey",
    "black",
];

// Extract hex values
const data = themeSettings?.data || {};
const hexColors = keys.map((key) => data[key]?.trim()).filter(Boolean);

// Write to JSON
if (hexColors.length) {
    fs.writeFileSync(outputFile, JSON.stringify(hexColors, null, 2));
    console.log(`Extracted ${hexColors.length} theme colors`);
} else {
    console.warn("No colors found in theme_settings");
}
