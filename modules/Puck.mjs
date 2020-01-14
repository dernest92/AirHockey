import { Circle } from "./Circle.mjs";

export class Puck extends Circle {
  constructor(props) {
    super(props);
  }
  handleEdge = () => {
    const { canvas, pos, radius, vel } = this;
    const { clientWidth, clientHeight } = canvas;
    if (pos.x + radius > clientWidth) {
      vel.x *= -1;
      pos.x = clientWidth - radius;
    }
    if (pos.x - radius < 0) {
      vel.x *= -1;
      pos.x = radius;
    }
    if (pos.y + radius > clientHeight) {
      vel.y *= -1;
      pos.y = clientHeight - radius;
    }
    if (pos.y - radius < 0) {
      vel.y *= -1;
      pos.y = radius;
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

  beforeRender = () => {
    this.updatePos();
    this.addDrag();
    this.handleEdge();
  };
}
