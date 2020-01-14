export class Vector {
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
