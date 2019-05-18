import 'lazysizes';

lazySizes.cfg.expand = 1000;

if (
  navigator.userAgent.indexOf('Safari') != -1 &&
  navigator.userAgent.indexOf('Mac') != -1 &&
  navigator.userAgent.indexOf('Chrome') == -1 &&
  navigator.userAgent.indexOf('iPad') == -1 &&
  navigator.userAgent.indexOf('iPhone') == -1
  ) {
  document.documentElement.classList.add('mac-os');
}
