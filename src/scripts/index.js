let header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.transform = `translate3d(0, ${window.scrollY * 0.5}px, 0)`;
});
