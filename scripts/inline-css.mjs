import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");

function escapeStyleClosing(css) {
  return css.replace(/<\/style/gi, "<\\/style");
}

const htmlNames = ["index.html", "not-found.html"];
const linkRe = /<link\s+rel="stylesheet"\s+href="([^"]+\.css)">/g;

/** @type {Map<string, string>} href -> inlined style tag */
const hrefToStyle = new Map();

for (const htmlName of htmlNames) {
  const htmlPath = path.join(dist, htmlName);
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, "utf8");
  let m;
  const re = new RegExp(linkRe.source, "g");
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (hrefToStyle.has(href)) continue;

    const cssRelative = href.startsWith("/") ? href.slice(1) : href;
    const cssPath = path.join(dist, cssRelative);
    if (!fs.existsSync(cssPath)) {
      console.warn(`inline-css: missing ${cssPath}`);
      continue;
    }
    const css = fs
    .readFileSync(cssPath, "utf8")
    .replace(/\/\*#\s*sourceMappingURL=[^*]+\*\//g, "");
    hrefToStyle.set(href, `<style>${escapeStyleClosing(css)}</style>`);
  }
}

for (const htmlName of htmlNames) {
  const htmlPath = path.join(dist, htmlName);
  if (!fs.existsSync(htmlPath)) continue;
  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace(linkRe, (full, href) => hrefToStyle.get(href) ?? full);
  fs.writeFileSync(htmlPath, html);
}

for (const href of hrefToStyle.keys()) {
  const cssRelative = href.startsWith("/") ? href.slice(1) : href;
  const cssPath = path.join(dist, cssRelative);
  if (fs.existsSync(cssPath)) fs.unlinkSync(cssPath);
  const mapPath = `${cssPath}.map`;
  if (fs.existsSync(mapPath)) fs.unlinkSync(mapPath);
}
