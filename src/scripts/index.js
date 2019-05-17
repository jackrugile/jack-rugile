import 'lazysizes';
//import SimplexNoise from 'simplex-noise';
//import Calc from './calc';

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





// let c = document.querySelector('.canvas-overlay');
// let ctx = c.getContext('2d');
// let w = window.innerWidth;
// let h = window.innerHeight;
// let dpr = window.devicePixelRatio;
// c.width = w * dpr;
// c.height = h * dpr;
// ctx.scale(dpr, dpr);

// let images = document.querySelectorAll('.cell-image');
// let pulses = [];

// images.forEach((elem) => {
//   elem.addEventListener('mouseenter', (e) => {
//     let bcr = elem.getBoundingClientRect();
//     for(let i = 0; i < 100; i++) {
//       // let x = e.clientX + Calc.rand(-50, 50);
//       // let y = e.clientY + Calc.rand(-50, 50);
//       let x = Calc.rand(bcr.left, bcr.left + bcr.width);
//       let y = Calc.rand(bcr.top, bcr.top + bcr.height);
//       let radius = Calc.rand(1, 20);
//       let speed = Calc.rand(0.025, 0.075);
//       pulses.push(new Pulse(x, y, radius, speed));
//     }
//   });
//   //elem.addEventListener('mouseleave', (e) => {
//     //createPulse(e.clientX, e.clientY);
//   //});
// });

// class Pulse {
//   constructor(x, y, radius, speed) {
//     this.x = x;
//     this.y = y;
//     this.prog = 0;
//     this.radius = radius;
//     this.speed = speed;
//     this.vel = this.speed * -10;
//   }

//   step(i) {
//     //this.vel -= 10 * this.speed;
//     this.vel *= 0.99;
//     this.y += this.vel;
//     if(this.prog < 1) {
//       this.prog += this.speed;
//     } else {
//       this.prog = 1;
//       this.destroy(i);
//     }
//   }

//   destroy(i) {
//     pulses.splice(i, 1);
//   }

//   draw() {
//     ctx.beginPath();
//     // ctx.arc(this.x, this.y, 0.0001 + this.radius * this.prog, 0, Math.PI * 2);
//     ctx.fillStyle = `hsla(0, 0%, 100%, ${1 - this.prog})`;
//     // ctx.fill();
//     ctx.fillRect(this.x, this.y, 1, this.radius);
//   }
// }

// function step() {
//   let i = pulses.length;
//   while(i--) {
//     pulses[i].step(i);
//   }
// }

// function draw() {
//   ctx.clearRect(0, 0, w, h);

//   let i = pulses.length;
//   while(i--) {
//     pulses[i].draw();
//   }
// }

// function loop() {
//   window.requestAnimationFrame(loop);
//   step();
//   draw();
// }

// loop();


















// class Scene {

//   constructor() {
//     this.simplex = new SimplexNoise();  
//     this.canvas = document.querySelector('.header-canvas');
//     this.ctx = this.canvas.getContext('2d');
//     this.reset();
//     this.loop();
//   }

//   reset() {
//     this.tick = 0;
//     this.width = 50;
//     this.height = 50;
//     this.canvas.width = this.width;
//     this.canvas.height = this.height;
//   }

//   step() {
//     this.tick++;
//   }

//   clear() {
//     //this.ctx.clearRect(0, 0, this.width, this.height);
//   }

//   draw() {
//     let xoff = 0;
//     let yoff = 0;
//     for(let x = 0; x < this.width; x++) {
//       yoff = 0;
//       for(let y = 0; y < this.height; y++) {
//         let val = this.simplex.noise3D(xoff, yoff, Date.now() / 4000);
//         val = (val + 1) / 2;
//         // if(val > 0.75) {
//         //   this.ctx.fillStyle = `hsla(345, 100%, 50%, 1)`;
//         // } else {
//         //   this.ctx.fillStyle = `hsla(0, 0%, 100%, 1)`;
//         // }
//         this.ctx.fillStyle = `hsla(0, 0%, ${60 + val * 60}%, 1)`;
//         this.ctx.fillRect(x, y, 1, 1);
//         yoff += 0.02;
//       }
//       xoff += 0.02;
//     }
//   }

//   loop() {
//     requestAnimationFrame(this.loop.bind(this));
//     this.step();
//     //this.clear();
//     this.draw();
//   }

// }

// const scene = new Scene()
