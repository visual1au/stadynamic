import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

// Paths setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalDataFile = path.resolve(
    __dirname,
    "../content/globals/theme_settings.yaml",
);
const outputFile = path.resolve(__dirname, "../resources/data/themeFont.json");

// Read and parse YAML
const yamlContent = fs.readFileSync(globalDataFile, "utf8");
const themeSettings = yaml.load(yamlContent);

// Extract the Google Fonts link
const googleFontCode = themeSettings?.data?.google_font?.code;

if (typeof googleFontCode === "string") {
    const match = googleFontCode.match(/family=([^&"]+)/i);

    if (match) {
        const familyParam = decodeURIComponent(match[1]);
        const fontName = familyParam.split(":")[0].replace(/\+/g, " ");

        const output = {
            primary: [fontName, "sans-serif"],
        };

        fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
        console.log(`✅ Extracted font: ${fontName}`);
    } else {
        console.warn("⚠️ Couldn't extract font family from the <link> tag.");
    }
} else {
    console.warn("⚠️ No valid google_font.code found in theme_settings.yaml");
}
