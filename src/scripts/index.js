let header = document.querySelector('header');
let scrolled = 0;

window.addEventListener('scroll', () => {
  scrolled = window.scrollY;
});

function loop() {
  window.requestAnimationFrame(loop);
  header.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
}

loop();
