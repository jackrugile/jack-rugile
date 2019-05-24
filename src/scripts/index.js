/*
 * Imports
 */
import 'lazysizes';
import HeaderCanvas from './header-canvas';

/*
 * Lazy Loading
 */
lazySizes.cfg.expand = 1000;
document.addEventListener('lazyloaded', function(e) {
  e.target.parentNode.classList.add('image-loaded');
});

/*
 * <html> and <body> Classes
 */
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

/*
 * Class and Height for 404
 */

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

/*
 * Custom Console Brand
 */

function consoleBrand() {
  let styles1 = `
    background: #14171f;
    color: #fff;
    font-family: courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;
  let styles2 = `
    background: #ff0040;
    color: #14171f;
    font-family: courier, monospace, sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 6px 10px;
  `;

  if (
    navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ||
    navigator.userAgent.toLowerCase().indexOf('safari') > -1
  ) {
    console.log('%c🏔️ Made in Denver, CO 🏔️%cJack Rugile', styles1, styles2);
  } else {
    console.log('Made in Denver, CO by Jack Rugile');
  }
  console.log('View Source: https://github.com/jackrugile/jack-rugile');
}

consoleBrand();

/*
 * Header Canvas
 */

if (!is404) {
  const headerCanvas = new HeaderCanvas();
}
