import { Circle } from "./Circle.mjs";
import { Vector } from "./Vector.mjs";
export class Striker extends Circle {
  constructor(props) {
    super(props);
    this.lastPos = props.pos;
    this.puck = props.puck;
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("touchmove", this.handleTouchMove);
  }

  handleTouchMove = e => {
    const { clientX, clientY } = e.touches[0];
    const { top, left } = this.canvas.getBoundingClientRect();
    this.moveStriker(clientX - left, clientY - top);
  };

  calcVel = () => {
    const { lastPos, pos } = this;
    this.vel = Vector.subtract(lastPos, pos);
  };

  calcPuckCollision = () => {
    const dist = Vector.subtract(this.pos, this.puck.pos);
    if (dist.mag() <= this.radius + this.puck.radius) {
      const unitNormal = Vector.divide(dist, dist.mag());
      const unitTangent = Vector.tangent(unitNormal);

      const a = this.vel;
      const b = this.puck.vel;

      const a_n = a.dot(unitNormal);
      const b_n = b.dot(unitNormal);
      // const a_t = a.dot(unitTangent);
      const b_t = b.dot(unitTangent);

      const sMass = 5;
      const pMass = 3;

      // const a_n_f = (a_n * (sMass - pMass) + 2 * pMass * b_n) / (sMass + pMass);
      const b_n_f = (b_n * (pMass - sMass) + 2 * sMass * a_n) / (sMass + pMass);

      // const a_n_after = Vector.mult(unitNormal, a_n_f);
      // const a_t_after = Vector.mult(unitTangent, a_t);
      const b_n_after = Vector.mult(unitNormal, b_n_f);
      const b_t_after = Vector.mult(unitTangent, b_t);

      // const strikerVel = Vector.add(a_n_after, a_t_after);
      const puckVel = Vector.add(b_n_after, b_t_after);

      const correction = Vector.mult(
        unitNormal,
        this.radius + this.puck.radius
      );
      const newV = Vector.add(this.pos, correction);
      this.puck.pos = newV;
      this.puck.vel = puckVel;
    }
  };

  moveStriker = (x, y) => {
    this.lastPos = new Vector(this.pos.x, this.pos.y);
    this.pos.x = x;
    this.pos.y = y;
  };

  handleMouseMove = e => {
    const { layerX, layerY } = e;
    this.moveStriker(layerX, layerY);
  };

  beforeRender = () => {
    this.calcPuckCollision();
    this.calcVel();
  };
}
