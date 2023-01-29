const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = window.innerHeight - 30;
canvas.width = window.innerWidth - 30;

let x = 200;
let y = 50;

let all_circles = [];
let turn_point = canvas.width + 100;

let up = false;
let down = false;
let right = true;
let left = false;

class circle {
  constructor(xpos, ypos, radius, color, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;

    this.turnUp = false;
    this.turnDown = false;
    this.turnRight = true;
    this.turnLeft = false;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
  }
}

for (let i = 0; i < 25; i++) {
  let my_circle = new circle(x, y, 10, "black", 1);
  all_circles.push(my_circle);

  x += -5;

  all_circles[i].draw(context);
}

updateCircle();

addEventListener("keyup", (event) => {
  if (event.key === "ArrowDown") {
    turn_point = all_circles[0].xpos + 10;
    up = false;
    down = true;
    right = false;
    left = false;
  } else if (event.key === "ArrowUp") {
    turn_point = all_circles[0].xpos + 10;
    up = true;
    down = false;
    right = false;
    left = false;
  } else if (event.key === "ArrowRight") {
    turn_point = all_circles[0].ypos + 10;
    up = false;
    down = false;
    right = true;
    left = false;
  } else if (event.key === "ArrowLeft") {
    turn_point = all_circles[0].ypos + 10;
    up = false;
    down = false;
    right = false;
    left = true;
  }
});

function updateCircle() {
  requestAnimationFrame(updateCircle);
  context.clearRect(0, 0, canvas.width, canvas.height);

  all_circles.forEach((el) => {
    el.draw(context);
    if (el.xpos + el.radius >= canvas.width) {
      el.xpos = 0;
    }
    if (el.ypos + el.radius >= canvas.height) {
      el.ypos = 0;
    }

    if (down && el.xpos + el.radius >= turn_point) {
      el.turnUp = false;
      el.turnDown = true;
      el.turnRight = false;
      el.turnLeft = false;
    }

    if (up && el.xpos + el.radius >= turn_point) {
      el.turnUp = true;
      el.turnDown = false;
      el.turnRight = false;
      el.turnLeft = false;
    }
    if (right && el.ypos + el.radius <= turn_point) {
      el.turnUp = false;
      el.turnDown = false;
      el.turnRight = true;
      el.turnLeft = false;
    }
    if (left && el.ypos + el.radius >= turn_point) {
      el.turnUp = false;
      el.turnDown = false;
      el.turnRight = false;
      el.turnLeft = true;
    }

    if (el.turnDown) {
      el.ypos += el.dy;
    }
    if (el.turnUp) {
      el.ypos -= el.dy;
    }
    if (el.turnRight) {
      el.xpos += el.dx;
    }
    if (el.turnLeft) {
      el.xpos -= el.dx;
    }
    // if (all_circles[0] === el) {
    //   el.xpos += el.dx;
    // }
    // else {
    //   el.xpos += el.dx;
    // }
  });
}
