export class Circle {
  constructor(props) {
    const { pos, vel, acc, radius, color, ctx, canvas } = props;
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.canvas = canvas;
  }

  handleEdge = () => {
    const { canvas, pos, radius, vel } = this;
    const { clientWidth, clientHeight } = canvas;
    if (pos.x + radius > clientWidth || pos.x - radius < 0) {
      vel.x *= -1;
    }
    if (pos.y + radius > clientHeight || pos.y - radius < 0) {
      vel.y *= -1;
    }
  };

  addDrag = () => {
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;
  };

  updatePos = () => {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  render = () => {
    this.beforeRender ? this.beforeRender() : null;
    const { ctx, pos, radius, color } = this;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };
}
