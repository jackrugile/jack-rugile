import "../styles/index.scss";

const THEME_STORAGE_KEY = "jackrugile-theme";
const THEME_MODES = [
  { value: null, label: "Theme: Auto" },
  { value: "light", label: "Theme: Light" },
  { value: "dark", label: "Theme: Dark" },
];

function getStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    if (t === "light" || t === "dark") return t;
  } catch (e) {
    // ignore
  }
  return null;
}

function effectiveThemeIsLight() {
  const s = getStoredTheme();
  if (s === "light") return true;
  if (s === "dark") return false;
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function updateThemeColorMeta() {
  const meta = document.getElementById("theme-color-meta");
  if (!meta) return;
  meta.setAttribute("content", effectiveThemeIsLight() ? "#f7f7f7" : "#0d0d0d");
}

function applyDocumentTheme() {
  const s = getStoredTheme();
  const root = document.documentElement;
  if (s === "light" || s === "dark") root.setAttribute("data-theme", s);
  else root.removeAttribute("data-theme");
  updateThemeColorMeta();
  updateThemeToggle();
}

function getThemeModeIndex() {
  const s = getStoredTheme();
  if (s === null) return 0;
  if (s === "light") return 1;
  return 2;
}

function updateThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const idx = getThemeModeIndex();
  const current = THEME_MODES[idx];
  const next = THEME_MODES[(idx + 1) % THEME_MODES.length];
  const labelEl = btn.querySelector(".theme-toggle-value");
  if (labelEl) labelEl.textContent = current.label;
  btn.setAttribute(
    "aria-label",
    `Theme: ${current.label}. Activate to use ${next.label} theme.`,
  );
}

function cycleTheme() {
  const nextIdx = (getThemeModeIndex() + 1) % THEME_MODES.length;
  const v = THEME_MODES[nextIdx].value;
  try {
    if (v == null) localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, v);
  } catch (e) {
    // ignore
  }
  applyDocumentTheme();
}

function initTheme() {
  applyDocumentTheme();
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", cycleTheme);
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", () => {
      if (getStoredTheme() === null) updateThemeColorMeta();
    });
}

initTheme();

function consoleBrand() {
  const styles1 = `
    background-color: #000;
    color: #fff;
    font-family: consolas, courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;
  const styles2 = `
    background-color: #ff0040;
    color: #000;
    font-family: consolas, courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;

  console.log(
    "%cMade in Denver, CO and Palm Bay, FL 🏔️❄️🌴🌊%cJack Rugile",
    styles1,
    styles2,
  );

  console.log("View Source: https://github.com/jackrugile/jack-rugile");
}

consoleBrand();
