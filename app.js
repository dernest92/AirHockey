try {
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    mag = () => {
      const a2 = Math.pow(this.x, 2);
      const b2 = Math.pow(this.y, 2);
      const c2 = a2 + b2;
      const c = Math.sqrt(c2);
      return c;
    };

    dot = v2 => {
      return this.x * v2.x + this.y * v2.y;
    };

    static add(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static tangent(vector) {
      return new Vector(-vector.y, vector.x);
    }

    static mult(vect, scalar) {
      return new Vector(vect.x * scalar, vect.y * scalar);
    }

    static subtract(vector1, vector2) {
      const x = vector2.x - vector1.x;
      const y = vector2.y - vector1.y;
      return new Vector(x, y);
    }

    static divide(vector, scalar) {
      return new Vector(vector.x / scalar, vector.y / scalar);
    }
  }

  //   class Circle {
  //     constructor(props) {
  //       const { pos, vel, acc, radius, color, ctx, canvas } = props;
  //       this.pos = pos;
  //       this.vel = vel;
  //       this.acc = acc;
  //       this.radius = radius;
  //       this.color = color;
  //       this.ctx = ctx;
  //       this.canvas = canvas;
  //     }

  //     handleEdge = () => {
  //       const { canvas, pos, radius, vel } = this;
  //       const { clientWidth, clientHeight } = canvas;
  //       if (pos.x + radius > clientWidth || pos.x - radius < 0) {
  //         vel.x *= -1;
  //       }
  //       if (pos.y + radius > clientHeight || pos.y - radius < 0) {
  //         vel.y *= -1;
  //       }
  //     };

  //     addDrag = () => {
  //       this.vel.x *= 0.99;
  //       this.vel.y *= 0.99;
  //     };

  //     updatePos = () => {
  //       this.pos.x += this.vel.x;
  //       this.pos.y += this.vel.y;
  //     };

  //     render = () => {
  //       this.beforeRender ? this.beforeRender() : null;
  //       const { ctx, pos, radius, color } = this;
  //       ctx.fillStyle = color;
  //       ctx.beginPath();
  //       ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
  //       ctx.fill();
  //     };
  //   }

  //   class Striker extends Circle {
  //     constructor(props) {
  //       super(props);
  //       this.lastPos = props.pos;
  //       this.puck = props.puck;
  //       this.canvas.addEventListener("mousemove", this.handleMouseMove);
  //       this.canvas.addEventListener("touchmove", this.handleTouchMove);
  //     }

  //     handleTouchMove = e => {
  //       const { clientX, clientY } = e.touches[0];
  //       const { top, left } = this.canvas.getBoundingClientRect();
  //       this.moveStriker(clientX - left, clientY - top);
  //     };

  //     calcVel = () => {
  //       const { lastPos, pos } = this;
  //       this.vel = Vector.subtract(lastPos, pos);
  //     };

  //     calcPuckCollision = () => {
  //       const dist = Vector.subtract(this.pos, this.puck.pos);
  //       if (dist.mag() <= this.radius + this.puck.radius) {
  //         const unitNormal = Vector.divide(dist, dist.mag());
  //         const unitTangent = Vector.tangent(unitNormal);

  //         const a = this.vel;
  //         const b = this.puck.vel;

  //         const a_n = a.dot(unitNormal);
  //         const b_n = b.dot(unitNormal);
  //         // const a_t = a.dot(unitTangent);
  //         const b_t = b.dot(unitTangent);

  //         const sMass = 5;
  //         const pMass = 3;

  //         // const a_n_f = (a_n * (sMass - pMass) + 2 * pMass * b_n) / (sMass + pMass);
  //         const b_n_f =
  //           (b_n * (pMass - sMass) + 2 * sMass * a_n) / (sMass + pMass);

  //         // const a_n_after = Vector.mult(unitNormal, a_n_f);
  //         // const a_t_after = Vector.mult(unitTangent, a_t);
  //         const b_n_after = Vector.mult(unitNormal, b_n_f);
  //         const b_t_after = Vector.mult(unitTangent, b_t);

  //         // const strikerVel = Vector.add(a_n_after, a_t_after);
  //         const puckVel = Vector.add(b_n_after, b_t_after);

  //         const correction = Vector.mult(
  //           unitNormal,
  //           this.radius + this.puck.radius
  //         );
  //         const newV = Vector.add(this.pos, correction);
  //         this.puck.pos = newV;
  //         this.puck.vel = puckVel;
  //       }
  //     };

  //     moveStriker = (x, y) => {
  //       this.lastPos = new Vector(this.pos.x, this.pos.y);
  //       this.pos.x = x;
  //       this.pos.y = y;
  //     };

  //     handleMouseMove = e => {
  //       const { layerX, layerY } = e;
  //       this.moveStriker(layerX, layerY);
  //     };

  //     beforeRender = () => {
  //       this.calcPuckCollision();
  //       this.calcVel();
  //     };
  //   }

  //   class Puck extends Circle {
  //     constructor(props) {
  //       super(props);
  //     }
  //     handleEdge = () => {
  //       const { canvas, pos, radius, vel } = this;
  //       const { clientWidth, clientHeight } = canvas;
  //       if (pos.x + radius > clientWidth) {
  //         vel.x *= -1;
  //         pos.x = clientWidth - radius;
  //       }
  //       if (pos.x - radius < 0) {
  //         vel.x *= -1;
  //         pos.x = radius;
  //       }
  //       if (pos.y + radius > clientHeight) {
  //         vel.y *= -1;
  //         pos.y = clientHeight - radius;
  //       }
  //       if (pos.y - radius < 0) {
  //         vel.y *= -1;
  //         pos.y = radius;
  //       }
  //     };

  //     addDrag = () => {
  //       this.vel.x *= 0.99;
  //       this.vel.y *= 0.99;
  //     };

  //     updatePos = () => {
  //       this.pos.x += this.vel.x;
  //       this.pos.y += this.vel.y;
  //     };

  //     beforeRender = () => {
  //       this.updatePos();
  //       this.addDrag();
  //       this.handleEdge();
  //     };
  //   }

  const canvas = document.querySelector(".canvas");
  canvas.width = 350;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  //   const puck = new Puck({
  //     pos: new Vector(175, 250),
  //     vel: new Vector(0, 0),
  //     acc: new Vector(0, 0),
  //     radius: 10,
  //     color: "#111",
  //     ctx,
  //     canvas
  //   });

  //   const striker = new Striker({
  //     pos: new Vector(175, 450),
  //     vel: new Vector(0, 0),
  //     acc: new Vector(0, 0),
  //     radius: 20,
  //     color: "red",
  //     ctx,
  //     canvas,
  //     puck
  //   });

  //   function clear() {
  //     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  //   }
  //   function loop() {
  //     clear();
  //     puck.render();
  //     striker.render();
  //     requestAnimationFrame(loop);
  //   }
  //   loop();
} catch (e) {
  console.log(e);
  const err = document.createElement("pre");
  err.textContent = e;
  err.classList.add("error");
  document.body.appendChild(err);
}
