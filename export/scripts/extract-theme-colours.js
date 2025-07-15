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

// Extract colours
const colourBlocks = themeSettings?.data?.colours || [];

const hexColors = colourBlocks
    .filter((entry) => entry?.enabled !== false && entry?.color)
    .map((entry) => entry.color.trim())
    .filter(Boolean);

// Write to JSON
if (hexColors.length) {
    fs.writeFileSync(outputFile, JSON.stringify(hexColors, null, 2));
    console.log(`✅ Extracted ${hexColors.length} theme colors`);
} else {
    console.warn("⚠️ No colors found in theme_settings");
}
