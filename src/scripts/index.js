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
