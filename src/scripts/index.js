import 'lazysizes';

// function map(val, inputMin, inputMax, outputMin, outputMax) {
//  return ((outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin))) + outputMin;
// }

// function clamp(val, min, max) {
//    return Math.max(Math.min(val, max), min);
//  }

// let headerTitle = document.querySelector('.header-title');
// let scrolled = 0;

// window.addEventListener('scroll', () => {
//   scrolled = window.scrollY;
// });

// function loop() {
//   window.requestAnimationFrame(loop);

//   let y = scrolled * 0.5;

//   let opacity = map(scrolled, 200, 400, 1, 0);
//   opacity = clamp(opacity, 0, 1);

//   let scale = map(scrolled, 200, 400, 1, 0.9);
//   scale = clamp(scale, 0, 1);

//   headerTitle.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
//   headerTitle.style.opacity = opacity;
// }

// loop();
