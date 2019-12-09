// todo: maybe refactor to a snake class
// todo: landing page, with start button
// end screen with win/loose, maybe show score (eaten apples)
// version: 0.1

const size = 300;
const scale = 10;
let speed = 350;
const directions = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0]
};

let direction = directions.RIGHT;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = size;
canvas.height = size;
context.scale(10, 10);

// todo: refactor to generateApple function, better spawn position logic
let apple = [
  Math.floor((Math.random() * size) / scale),
  Math.floor((Math.random() * size) / scale)
];
const snake = [
  [11, 14],
  [10, 14]
];

function update() {
  context.clearRect(0, 0, 30, 30);
  const head = snake[0];

  snake.unshift([head[0] + direction[0], head[1] + direction[1]]);

  // todo: collisions: check [] wall, [] tail
  // eat the apple
  if (snake[0][0] === apple[0] && snake[0][1] === apple[1]) {
    apple = [
      Math.floor((Math.random() * size) / scale),
      Math.floor((Math.random() * size) / scale)
    ];
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  snake.forEach(([x, y]) => {
    context.fillStyle = "green";
    context.fillRect(x + 0.1, y + 0.1, 0.8, 0.8);
  });

  context.fillStyle = "red";
  context.fillRect(apple[0] + 0.1, apple[1] + 0.1, 0.8, 0.8);
}

// todo: increase speed adjustable
// like count eaten apples, and create a new interval with faster timeout
setInterval(update, 300);

// todo: prevent go to opposite direction
document.body.onkeydown = function(e) {
  if (e.key === "ArrowDown") {
    direction = directions.DOWN;
  }
  if (e.key === "ArrowUp") {
    direction = directions.UP;
  }
  if (e.key === "ArrowLeft") {
    direction = directions.LEFT;
  }
  if (e.key === "ArrowRight") {
    direction = directions.RIGHT;
  }
};
