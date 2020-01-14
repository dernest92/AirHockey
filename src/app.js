import { Vector } from "./Vector.js";
import { Striker } from "./Striker";
import { Puck } from "./Puck.js";

const canvas = document.querySelector(".canvas");
canvas.width = 350;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const puck = new Puck({
  pos: new Vector(175, 250),
  vel: new Vector(0, 0),
  acc: new Vector(0, 0),
  radius: 10,
  color: "#111",
  ctx,
  canvas
});

const striker = new Striker({
  pos: new Vector(175, 450),
  vel: new Vector(0, 0),
  acc: new Vector(0, 0),
  radius: 25,
  color: "red",
  ctx,
  canvas,
  puck
});

function clear() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
function loop() {
  clear();
  puck.render();
  striker.render();
  requestAnimationFrame(loop);
}
loop();
