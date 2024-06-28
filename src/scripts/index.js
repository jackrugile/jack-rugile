import data from "../data/data.json";

let allProjects = data.projects.map((project) => project.slug);
let featuredProjects = [];
data.features.forEach((feature) => {
  feature.projects.forEach((project) => {
    featuredProjects.push(project);
  });
});
let notFeaturedProjects = allProjects.filter(
  (x) => !featuredProjects.includes(x)
);
console.log("all", allProjects);
console.log("featured", featuredProjects);
console.log("not-featured", notFeaturedProjects);

document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("has-js");

function consoleBrand() {
  const styles1 = `
    background-color: #000;
    color: #fff;
    font-family: courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;
  const styles2 = `
    background-color: #ff0040;
    color: #000;
    font-family: courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;

  console.log(
    "%cMade in Denver, CO and Palm Bay, FL 🏔️❄️🌴🌊%cJack Rugile",
    styles1,
    styles2
  );

  console.log("View Source: https://github.com/jackrugile/jack-rugile");
}

consoleBrand();

function handleFocusIndicator() {
  const focusIndicator = document.querySelector(".focus-indicator");
  const offset = 5;

  function syncFocusIndicator() {
    if (document.activeElement && document.activeElement !== document.body) {
      const bcr = document.activeElement.getBoundingClientRect();
      const x = bcr.x - offset;
      const y = bcr.y - offset + window.scrollY;
      const width = bcr.width + offset * 2;
      const height = bcr.height + offset * 2;
      focusIndicator.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${width}, ${height})`;
    }
  }

  document.addEventListener("blur", syncFocusIndicator, true);
  document.addEventListener("focusin", syncFocusIndicator, true);
  window.addEventListener("resize", syncFocusIndicator);
}

handleFocusIndicator();

function initImage(image) {
  image.parentNode.classList.add("loaded");
}

function onImageLoad(e) {
  initImage(this);
  this.removeEventListener("load", onImageLoad);
}

function onImageError() {
  this.removeEventListener("load", onImageError);
}

const images = document.querySelectorAll("img[loading='lazy']");

images.forEach((image) => {
  if (image.complete && image.naturalWidth > 1) {
    initImage(image);
  } else {
    image.addEventListener("load", onImageLoad);
    image.addEventListener("error", onImageError);
  }
});
