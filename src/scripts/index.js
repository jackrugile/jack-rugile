import 'lazysizes';

lazySizes.cfg.expand = 1000;
document.addEventListener('lazyloaded', function (e) {
  e.target.parentNode.classList.add('image-loaded');
  window.setTimeout(() => {
    e.target.parentNode.classList.add('image-loaded-complete');
  }, 800);
});

document.documentElement.classList.remove('no-js');

if (
  navigator.userAgent.indexOf('Safari') != -1 &&
  navigator.userAgent.indexOf('Mac') != -1 &&
  navigator.userAgent.indexOf('Chrome') == -1 &&
  navigator.userAgent.indexOf('iPad') == -1 &&
  navigator.userAgent.indexOf('iPhone') == -1
) {
  document.documentElement.classList.add('mac-os');
}

let is404 = document.querySelector('.is-404');

function set404Height() {
  document.documentElement.style.height = `${window.innerHeight}px`;
  document.body.style.height = `${window.innerHeight}px`;

  document.documentElement.style.minHeight = `0px`;
  document.body.style.minHeight = `0px`;
}

if (is404) {
  set404Height();
  window.addEventListener('resize', set404Height);
  window.addEventListener('orientationchange', set404Height);
}

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

  if (
    navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ||
    navigator.userAgent.toLowerCase().indexOf('safari') > -1
  ) {
    console.log(
      '%cMade in Denver, CO and Palm Bay, FL 🏔️❄️🌴🌊%cJack Rugile',
      styles1,
      styles2
    );
  } else {
    console.log('Made in Denver, CO and Palm Bay, FL 🏔️❄️🌴🌊 by Jack Rugile');
  }
  console.log('View Source: https://github.com/jackrugile/jack-rugile');
}

consoleBrand();

function handleColorTheme() {
  // init at null
  let colorTheme = null;

  // use local storage preference if it exists
  colorTheme = localStorage.getItem('colorTheme');

  // use OS preference if it exists
  if(!colorTheme) {
    colorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // use dark if none is selected
  if(!colorTheme) {
    colorTheme = 'dark';
  }

  // set initial color theme if dark is chosen
  if(colorTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
  }

  // toggle color theme on click and store selection
  document.querySelector('.footer-color-theme').addEventListener('click', () => {
    if(colorTheme === 'dark') {
      colorTheme = 'light';
      document.documentElement.classList.remove('dark-theme');
    } else {
      colorTheme = 'dark';
      document.documentElement.classList.add('dark-theme');
    }

    localStorage.setItem('colorTheme', colorTheme);
  });
}

handleColorTheme();

function getOffsetLeft( elem )
{
    var offsetLeft = 0;
    do {
      if ( !isNaN( elem.offsetLeft ) )
      {
          offsetLeft += elem.offsetLeft;
      }
    } while( elem = elem.offsetParent );
    return offsetLeft;
}

function getOffsetTop( elem )
{
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
        offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}



function handleFocusIndicator() {
  const focusIndicator = document.querySelector('.focus-indicator');
  const offset = 10;

  function syncFocusIndicator() {
    const focusedElement = document.activeElement;
    if(!focusedElement || focusedElement === document.body) {
      focusIndicator.style.opacity = 0;
    } else {
      const x = getOffsetLeft(focusedElement) - offset / 2;
      const y = getOffsetTop(focusedElement) - offset / 2;
      const w = focusedElement.offsetWidth + offset;
      const h = focusedElement.offsetHeight + offset;
      focusIndicator.style.opacity = 1;
      focusIndicator.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${w}, ${h})`;
    }
  }

  document.addEventListener('blur', syncFocusIndicator, true);
  document.addEventListener('focusin', syncFocusIndicator, true);
  window.addEventListener('resize', syncFocusIndicator);
}

handleFocusIndicator();
