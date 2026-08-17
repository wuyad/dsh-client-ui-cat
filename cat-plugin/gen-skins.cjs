// Generates skins.txt: a JS fragment with the SKINS table + renderSkin().
const fs = require("fs");
const dir = "/Users/wuyadong/src/dsh-cat/cat-plugin/assets/cats";

const skins = [
  ["cat-orange.svg", "橘猫"],
  ["cat-white.svg", "白猫"],
  ["cat-tuxedo.svg", "奶牛猫"],
  ["cat-black.svg", "黑猫"],
  ["cat-gray.svg", "灰猫"],
  ["cat-siamese.svg", "暹罗猫"]
];

const CLOSED_EYE =
  '<g class="wc-eye-closed"><path d="M 47 18 q 3 -3.6 6 0" stroke="#7a4a24" stroke-width="2" fill="none" stroke-linecap="round"/></g>';
const HURT_EYE =
  '<g class="wc-eye-hurt"><g stroke="#2a2a32" stroke-width="2" stroke-linecap="round"><path d="M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4"/></g></g>';

function extract(file) {
  let s = fs.readFileSync(dir + "/" + file, "utf8");
  const start = s.indexOf("<svg");
  const openEnd = s.indexOf(">", start) + 1;
  const close = s.lastIndexOf("</svg>");
  let inner = s.slice(openEnd, close);
  inner = inner.replace(/<!--[\s\S]*?-->/g, "");
  inner = inner.replace(/<style[\s\S]*?<\/style>/g, "");
  // collapse whitespace so the markup fits on one JS string line
  inner = inner.replace(/\s+/g, " ").trim();
  return inner;
}

const out = [];
out.push("\t\t\t// Walking-cat skins (assets/cats). Right-click the cat to cycle.");
out.push("\t\t\tconst SKINS = [");
for (const [file, name] of skins) {
  let inner = extract(file);
  // walking-cycle skins: append the shared closed/hurt eye states
  inner += CLOSED_EYE + HURT_EYE;
  out.push('\t\t\t\t{ name: "' + name + '", markup: "' + inner.replace(/"/g, '\\"') + '" },');
}
out.push("\t\t\t];");
out.push("\t\t\tconst SKIN_LINES =");
out.push("\t\t\t\t'<g class=\"dsh-cat-lines\"><rect x=\"-26\" y=\"12\" width=\"14\" height=\"2.5\" rx=\"1.25\" fill=\"rgba(130,85,30,0.45)\"/><rect x=\"-32\" y=\"17\" width=\"20\" height=\"2.5\" rx=\"1.25\" fill=\"rgba(130,85,30,0.45)\"/><rect x=\"-24\" y=\"22\" width=\"10\" height=\"2.5\" rx=\"1.25\" fill=\"rgba(130,85,30,0.45)\"/></g>';");
out.push("\t\t\tconst renderSkin = (i) => SKIN_LINES + SKINS[i].markup;");
out.push("");

fs.writeFileSync("/Users/wuyadong/src/dsh-cat/cat-plugin/skins.txt", out.join("\n"));
console.log("skins.txt generated:", out.length, "lines");
