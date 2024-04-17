function consoleBrand() {
  let styles1 = `
    background-color: #000;
    color: #fff;
    font-family: courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;
  let styles2 = `
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
