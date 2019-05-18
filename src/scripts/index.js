import 'lazysizes';

lazySizes.cfg.expand = 1000;

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

document.addEventListener('lazyloaded', function(e) {
  e.target.parentNode.classList.add('image-loaded');
});

let is404 = document.querySelector('.is-404');

function set404Height() {
  document.documentElement.style.height = `${window.innerHeight}px`;
  document.body.style.height = `${window.innerHeight}px`;

  document.documentElement.style.minHeight = `0px`;
  document.body.style.minHeight = `0px`;
}

if(is404) {
  set404Height();
  window.addEventListener('resize', set404Height);
  window.addEventListener('orientationchange', set404Height);
}
