"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

try {
  var clear = function clear() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  };

  var loop = function loop() {
    clear();
    puck.render();
    striker.render();
    requestAnimationFrame(loop);
  };

  var Vector =
    /*#__PURE__*/
    (function() {
      function Vector(x, y) {
        var _this = this;

        _classCallCheck(this, Vector);

        _defineProperty(this, "mag", function() {
          var a2 = Math.pow(_this.x, 2);
          var b2 = Math.pow(_this.y, 2);
          var c2 = a2 + b2;
          var c = Math.sqrt(c2);
          return c;
        });

        _defineProperty(this, "dot", function(v2) {
          return _this.x * v2.x + _this.y * v2.y;
        });

        this.x = x;
        this.y = y;
      }

      _createClass(Vector, null, [
        {
          key: "add",
          value: function add(v1, v2) {
            return new Vector(v1.x + v2.x, v1.y + v2.y);
          }
        },
        {
          key: "tangent",
          value: function tangent(vector) {
            return new Vector(-vector.y, vector.x);
          }
        },
        {
          key: "mult",
          value: function mult(vect, scalar) {
            return new Vector(vect.x * scalar, vect.y * scalar);
          }
        },
        {
          key: "subtract",
          value: function subtract(vector1, vector2) {
            var x = vector2.x - vector1.x;
            var y = vector2.y - vector1.y;
            return new Vector(x, y);
          }
        },
        {
          key: "divide",
          value: function divide(vector, scalar) {
            return new Vector(vector.x / scalar, vector.y / scalar);
          }
        }
      ]);

      return Vector;
    })();

  var Circle = function Circle(props) {
    var _this2 = this;

    _classCallCheck(this, Circle);

    _defineProperty(this, "handleEdge", function() {
      var canvas = _this2.canvas,
        pos = _this2.pos,
        radius = _this2.radius,
        vel = _this2.vel;
      var clientWidth = canvas.clientWidth,
        clientHeight = canvas.clientHeight;

      if (pos.x + radius > clientWidth || pos.x - radius < 0) {
        vel.x *= -1;
      }

      if (pos.y + radius > clientHeight || pos.y - radius < 0) {
        vel.y *= -1;
      }
    });

    _defineProperty(this, "addDrag", function() {
      _this2.vel.x *= 0.99;
      _this2.vel.y *= 0.99;
    });

    _defineProperty(this, "updatePos", function() {
      _this2.pos.x += _this2.vel.x;
      _this2.pos.y += _this2.vel.y;
    });

    _defineProperty(this, "render", function() {
      _this2.beforeRender ? _this2.beforeRender() : null;
      var ctx = _this2.ctx,
        pos = _this2.pos,
        radius = _this2.radius,
        color = _this2.color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });

    var _pos = props.pos,
      _vel = props.vel,
      acc = props.acc,
      _radius = props.radius,
      _color = props.color,
      _ctx = props.ctx,
      _canvas = props.canvas;
    this.pos = _pos;
    this.vel = _vel;
    this.acc = acc;
    this.radius = _radius;
    this.color = _color;
    this.ctx = _ctx;
    this.canvas = _canvas;
  };

  var Striker =
    /*#__PURE__*/
    (function(_Circle) {
      _inherits(Striker, _Circle);

      function Striker(props) {
        var _this3;

        _classCallCheck(this, Striker);

        _this3 = _possibleConstructorReturn(
          this,
          _getPrototypeOf(Striker).call(this, props)
        );

        _defineProperty(
          _assertThisInitialized(_this3),
          "handleTouchMove",
          function(e) {
            e.preventDefault();
            var _e$touches$ = e.touches[0],
              clientX = _e$touches$.clientX,
              clientY = _e$touches$.clientY;

            var _this3$canvas$getBoun = _this3.canvas.getBoundingClientRect(),
              top = _this3$canvas$getBoun.top,
              left = _this3$canvas$getBoun.left;

            _this3.moveStriker(clientX - left, clientY - top);
          }
        );

        _defineProperty(_assertThisInitialized(_this3), "calcVel", function() {
          var _assertThisInitialize = _assertThisInitialized(_this3),
            lastPos = _assertThisInitialize.lastPos,
            pos = _assertThisInitialize.pos;

          _this3.vel = Vector.subtract(lastPos, pos);
        });

        _defineProperty(
          _assertThisInitialized(_this3),
          "calcPuckCollision",
          function() {
            var dist = Vector.subtract(_this3.pos, _this3.puck.pos);

            if (dist.mag() <= _this3.radius + _this3.puck.radius) {
              var unitNormal = Vector.divide(dist, dist.mag());
              var unitTangent = Vector.tangent(unitNormal);
              var a = _this3.vel;
              var b = _this3.puck.vel;
              var a_n = a.dot(unitNormal);
              var b_n = b.dot(unitNormal); // const a_t = a.dot(unitTangent);

              var b_t = b.dot(unitTangent);
              var sMass = 5;
              var pMass = 3; // const a_n_f = (a_n * (sMass - pMass) + 2 * pMass * b_n) / (sMass + pMass);

              var b_n_f =
                (b_n * (pMass - sMass) + 2 * sMass * a_n) / (sMass + pMass); // const a_n_after = Vector.mult(unitNormal, a_n_f);
              // const a_t_after = Vector.mult(unitTangent, a_t);

              var b_n_after = Vector.mult(unitNormal, b_n_f);
              var b_t_after = Vector.mult(unitTangent, b_t); // const strikerVel = Vector.add(a_n_after, a_t_after);

              var puckVel = Vector.add(b_n_after, b_t_after);
              var correction = Vector.mult(
                unitNormal,
                _this3.radius + _this3.puck.radius
              );
              var newV = Vector.add(_this3.pos, correction);
              _this3.puck.pos = newV;
              _this3.puck.vel = puckVel;
            }
          }
        );

        _defineProperty(_assertThisInitialized(_this3), "moveStriker", function(
          x,
          y
        ) {
          _this3.lastPos = new Vector(_this3.pos.x, _this3.pos.y);
          _this3.pos.x = x;
          _this3.pos.y = y;
        });

        _defineProperty(
          _assertThisInitialized(_this3),
          "handleMouseMove",
          function(e) {
            var layerX = e.layerX,
              layerY = e.layerY;

            _this3.moveStriker(layerX, layerY);
          }
        );

        _defineProperty(
          _assertThisInitialized(_this3),
          "beforeRender",
          function() {
            _this3.calcPuckCollision();

            _this3.calcVel();
          }
        );

        _this3.lastPos = props.pos;
        _this3.puck = props.puck;

        _this3.canvas.addEventListener("mousemove", _this3.handleMouseMove);

        _this3.canvas.addEventListener("touchmove", _this3.handleTouchMove);

        return _this3;
      }

      return Striker;
    })(Circle);

  var Puck =
    /*#__PURE__*/
    (function(_Circle2) {
      _inherits(Puck, _Circle2);

      function Puck(props) {
        var _this4;

        _classCallCheck(this, Puck);

        _this4 = _possibleConstructorReturn(
          this,
          _getPrototypeOf(Puck).call(this, props)
        );

        _defineProperty(
          _assertThisInitialized(_this4),
          "handleEdge",
          function() {
            var _assertThisInitialize2 = _assertThisInitialized(_this4),
              canvas = _assertThisInitialize2.canvas,
              pos = _assertThisInitialize2.pos,
              radius = _assertThisInitialize2.radius,
              vel = _assertThisInitialize2.vel;

            var clientWidth = canvas.clientWidth,
              clientHeight = canvas.clientHeight;

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
          }
        );

        _defineProperty(_assertThisInitialized(_this4), "addDrag", function() {
          _this4.vel.x *= 0.99;
          _this4.vel.y *= 0.99;
        });

        _defineProperty(
          _assertThisInitialized(_this4),
          "updatePos",
          function() {
            _this4.pos.x += _this4.vel.x;
            _this4.pos.y += _this4.vel.y;
          }
        );

        _defineProperty(
          _assertThisInitialized(_this4),
          "beforeRender",
          function() {
            _this4.updatePos();

            _this4.addDrag();

            _this4.handleEdge();
          }
        );

        return _this4;
      }

      return Puck;
    })(Circle);

  var canvas = document.querySelector(".canvas");
  canvas.width = 350;
  canvas.height = 500;
  var ctx = canvas.getContext("2d");
  var puck = new Puck({
    pos: new Vector(175, 250),
    vel: new Vector(0, 0),
    acc: new Vector(0, 0),
    radius: 10,
    color: "#111",
    ctx: ctx,
    canvas: canvas
  });
  var striker = new Striker({
    pos: new Vector(175, 450),
    vel: new Vector(0, 0),
    acc: new Vector(0, 0),
    radius: 20,
    color: "red",
    ctx: ctx,
    canvas: canvas,
    puck: puck
  });
  loop();
} catch (e) {
  console.log(e);
  var err = document.createElement("pre");
  err.textContent = e;
  err.classList.add("error");
  document.body.appendChild(err);
}
