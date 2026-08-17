const fs = require("fs");
const dir = "/Users/wuyadong/src/dsh-cat/cat-plugin";
const file = dir + "/lib/client.js";
let src = fs.readFileSync(file, "utf8");

// 1) replace the CSS template content
const openMark = "const CAT_CSS = `";
const openIdx = src.indexOf(openMark);
if (openIdx === -1) throw new Error("CSS open marker not found");
const cssStart = openIdx + openMark.length;
const closeMark = "\n`;";
const cssEnd = src.indexOf(closeMark, cssStart);
if (cssEnd === -1) throw new Error("CSS close marker not found");
const newCss = fs.readFileSync(dir + "/svg.css", "utf8").trimEnd();
src = src.slice(0, cssStart) + "\n" + newCss + src.slice(cssEnd);

// 2) replace the innerHTML expression
const htmlMark = "root.innerHTML =";
const htmlStart = src.indexOf(htmlMark);
if (htmlStart === -1) throw new Error("innerHTML marker not found");
const endLineMark = "--3\">z</div>';";
const endIdx = src.indexOf(endLineMark, htmlStart);
if (endIdx === -1) throw new Error("innerHTML end marker not found");
const htmlEnd = endIdx + endLineMark.length;
const newMarkup = fs.readFileSync(dir + "/markup.txt", "utf8").trimEnd();
src = src.slice(0, htmlStart) + newMarkup + src.slice(htmlEnd);

// 3) update the size constants for the 60x42 asset canvas
src = src.replace("// Visual (scaled) cat size; canvas is 96x88 at scale 0.7.", "// Visual cat size (the asset's 60x42 canvas).");
src = src.replace("const CAT_W = 67;", "const CAT_W = 60;");
src = src.replace("const CAT_H = 62;", "const CAT_H = 42;");

// 4) insert the skins fragment before apply()
const applyMark = "function apply(ctx) {";
const applyIdx = src.indexOf(applyMark);
if (applyIdx === -1) throw new Error("apply marker not found");
const skins = fs.readFileSync(dir + "/skins.txt", "utf8").trimEnd();
src = src.slice(0, applyIdx) + skins + "\n\t\t\t" + src.slice(applyIdx);

fs.writeFileSync(file, src);
console.log("spliced OK. size:", src.length);
