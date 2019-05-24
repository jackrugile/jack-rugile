import SimplexNoise from 'simplex-noise';

class HeaderCanvas {
  constructor() {
    this.canvas = document.querySelector('.header-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.simplex = new SimplexNoise();

    this.listen();
    this.reset();
    this.loop();
  }

  clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
  }

  easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  }

  listen() {
    window.addEventListener('resize', this.reset.bind(this));
  }

  reset() {
    this.dpr = window.devicePixelRatio;
    this.w = window.innerWidth;
    this.h = 200;
    this.cx = this.w / 2;
    this.cy = this.h / 2;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = `this{this.w}px`;
    this.canvas.style.height = `this{this.h}px`;
    this.ctx.scale(this.dpr, this.dpr);

    this.grad = this.ctx.createLinearGradient(0, 0, this.w, 0);
    this.grad.addColorStop(0, 'hsla(195, 100%, 50%, 1)');
    this.grad.addColorStop(1, 'hsla(345, 100%, 50%, 1)');

    this.count = Math.floor(this.w / 10);
    this.xoff = 0;
    this.xinc = 3 / this.count;
    this.yoff = 0;
    this.yinc = 0.001;
    this.length = this.w + 10;
    this.amp = 100;
  }

  wave(w, res) {
    this.ctx.beginPath();
    for (let i = 0; i <= this.count; i++) {
      this.xoff += this.xinc;
      let x = this.cx - this.length / 2 + (this.length / this.count) * i;
      let yAmp =
        this.amp -
        this.easeInOutQuad(
          this.clamp(Math.abs(x - this.cx) / this.cx - 0.1, 0, 1),
          0,
          1,
          1
        ) *
          this.amp;
      let y = this.cy + this.simplex.noise2D(this.xoff, this.yoff * res) * yAmp;
      this.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
    }

    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = 'hsl(225, 10%, 90%)';
    // this.ctx.strokeStyle = this.grad;
    this.ctx.stroke();
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.xoff = 0;
    this.wave(0.5, 2.5);
    this.wave(1, 2);
    this.wave(1.5, 1.5);
    this.wave(2, 1);
    this.wave(2.5, 0.5);
    this.yoff += this.yinc;
  }
}

export default HeaderCanvas;
