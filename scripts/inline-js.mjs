import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");

function escapeScriptClosing(js) {
  return js.replace(/<\/script/gi, "<\\/script");
}

const htmlNames = ["index.html", "not-found.html"];
const scriptSrcRe = /<script\s+src="([^"]+)"([^>]*)><\/script>/gi;

/** @type {Map<string, string>} src attribute value -> full inline script element */
const srcToScript = new Map();

for (const htmlName of htmlNames) {
  const htmlPath = path.join(dist, htmlName);
  if (!fs.existsSync(htmlPath)) continue;
  const html = fs.readFileSync(htmlPath, "utf8");
  let m;
  const re = new RegExp(scriptSrcRe.source, scriptSrcRe.flags);
  while ((m = re.exec(html)) !== null) {
    const srcAttr = m[1];
    if (srcToScript.has(srcAttr)) continue;

    const jsRelative = srcAttr.startsWith("/") ? srcAttr.slice(1) : srcAttr;
    const jsPath = path.join(dist, jsRelative);
    if (!fs.existsSync(jsPath)) {
      console.warn(`inline-js: missing ${jsPath}`);
      continue;
    }
    let js = fs
      .readFileSync(jsPath, "utf8")
      .replace(/\/\/# sourceMappingURL=[^\n]+\n?/g, "");
    const attrs = m[2].trim();
    const open = attrs ? `<script ${attrs}>` : "<script>";
    srcToScript.set(srcAttr, `${open}${escapeScriptClosing(js)}</script>`);
  }
}

for (const htmlName of htmlNames) {
  const htmlPath = path.join(dist, htmlName);
  if (!fs.existsSync(htmlPath)) continue;
  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace(scriptSrcRe, (full, srcAttr) => srcToScript.get(srcAttr) ?? full);
  fs.writeFileSync(htmlPath, html);
}

for (const srcAttr of srcToScript.keys()) {
  const jsRelative = srcAttr.startsWith("/") ? srcAttr.slice(1) : srcAttr;
  const jsPath = path.join(dist, jsRelative);
  if (fs.existsSync(jsPath)) fs.unlinkSync(jsPath);
  const mapPath = `${jsPath}.map`;
  if (fs.existsSync(mapPath)) fs.unlinkSync(mapPath);
}
