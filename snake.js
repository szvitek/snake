// todo: refactor to a snake class 🐍
// todo: landing page, with start button 🔘
// todo: end screen with win/loose, 🏆
// todo: show score (eaten apples) 🍎
// todo:  use vue.js to make life easier managing landing page/game/options/score/end screens
// todo: turn app into pwa for offline play 📱
// version: 0.2

let score = 0;
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

async function update() {
  context.clearRect(0, 0, 30, 30);
  const head = snake[0];

  const newHeadX = head[0] + direction[0];
  const newHeadY = head[1] + direction[1];

  // wall collide logic
  let didCollideWall = false;
  if (
    newHeadX < 0 ||
    newHeadY < 0 ||
    newHeadX === size / scale ||
    newHeadY === size / scale
  ) {
    didCollideWall = true;
  }

  snake.unshift([newHeadX, newHeadY]);

  // eat the apple
  if (snake[0][0] === apple[0] && snake[0][1] === apple[1]) {
    score++;
    apple = [
      Math.floor((Math.random() * size) / scale),
      Math.floor((Math.random() * size) / scale)
    ];
  } else {
    snake.pop();
  }

  // tail collide logic
  const [h, ...tail] = snake;
  const didCollideSelf = tail.some(t => t[0] === h[0] && t[1] === h[1]);

  // end
  if (didCollideSelf || didCollideWall) {
    const restart = await confirm("Play again");
    if (restart) {
      location.reload();
    } else {
      clearInterval(intervalId);
    }
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

// todo: increase speed automatically
// like count eaten apples, and create a new interval with faster timeout
const intervalId = setInterval(update, 300);

document.body.onkeydown = function(e) {
  if (e.key === "ArrowDown" && direction !== directions.UP) {
    direction = directions.DOWN;
  }
  if (e.key === "ArrowUp" && direction !== directions.DOWN) {
    direction = directions.UP;
  }
  if (e.key === "ArrowLeft" && direction !== directions.RIGHT) {
    direction = directions.LEFT;
  }
  if (e.key === "ArrowRight" && direction !== directions.LEFT) {
    direction = directions.RIGHT;
  }
};
