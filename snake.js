// todo: refactor to a snake class 🐍
// todo: landing page, with start button 🔘
// todo: end screen with win/loose, 🏆
// todo: show score (eaten apples) 🍎
// todo: use vue.js to make life easier managing landing page/game/options/score/end screens
// todo: turn app into pwa for offline play 📱
// version: 0.3

let score = 0;
const size = 150;
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

let allCellsMap = {};
for (let i = 0; i < size / scale; i++) {
  allCellsMap[i] = [];
  for (let j = 0; j < size / scale; j++) {
    allCellsMap[i].push(j);
  }
}

// done: refactor to generateApple function, better spawn position logic
let apple;
const snake = [
  [7, 7],
  [6, 7]
];
generateApple();

/*
  💩💩💩💩
  couldn't have a better idea, not sure how efficient it is. tested on a 4*4 sized map and it worked fine
  
  explanation:
  0, generate a hashmap of all field coordinates (outside of this function for performance imprvements)
  1, clone the hashmap
  2, remove the fields where there is a snake on it so we get all those cells that are empty
  3, if there is no empty y on that x value, remove from hashmap
  4, get a random x from free fields, and then get a random y from that x coordinate and generate a new apple
  5, check if we win
*/
function generateApple() {
  const allCellsMapCopy = JSON.parse(JSON.stringify(allCellsMap)); // 1
  const freeCellsMap = snake.reduce((sum, current) => {
    //2
    const [x, y] = current;
    sum[x] = sum[x].filter(val => val !== y);
    return sum;
  }, allCellsMapCopy);

  // 3, remove empty arrays
  Object.entries(freeCellsMap).forEach(([x, ys]) => {
    if (ys.length === 0) {
      delete freeCellsMap[x];
    }
  });

  // 4
  const freeCells = Object.entries(freeCellsMap);
  if (!freeCells.length) {
    //5
    clearInterval(intervalId);
    alert("you win!");
  }
  const randomEntryIndex = Math.floor(Math.random() * freeCells.length); // get a random entries index
  const randomEntry = freeCells[randomEntryIndex];
  const appleX = Number(randomEntry[0]); // get the x of the random entry, this will be the apple's x coordinate

  const yLength = randomEntry[1].length; // get the y array's length
  const randomYIndex = Math.floor(Math.random() * yLength); // get a random y's index
  const appleY = randomEntry[1][randomYIndex]; // get the value of the random y, this will be the apple's y coordinate

  apple = [appleX, appleY];
}

let = didChangeDirection = false;

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
    generateApple();
  } else {
    snake.pop();
  }

  // tail collide logic
  const [h, ...tail] = snake;
  const didCollideSelf = tail.some(t => t[0] === h[0] && t[1] === h[1]);

  // game over
  if (didCollideSelf || didCollideWall) {
    const restart = await confirm("Play again");
    if (restart) {
      location.reload();
    } else {
      clearInterval(intervalId);
    }
  }

  draw();
  didChangeDirection = false;
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
const intervalId = setInterval(update, speed);

document.body.onkeydown = function(e) {
  if (!didChangeDirection) {
    if (e.key === "ArrowDown" && direction !== directions.UP) {
      direction = directions.DOWN;
      didChangeDirection = true;
    }
    if (e.key === "ArrowUp" && direction !== directions.DOWN) {
      direction = directions.UP;
      didChangeDirection = true;
    }
    if (e.key === "ArrowLeft" && direction !== directions.RIGHT) {
      direction = directions.LEFT;
      didChangeDirection = true;
    }
    if (e.key === "ArrowRight" && direction !== directions.LEFT) {
      direction = directions.RIGHT;
      didChangeDirection = true;
    }
  }
};
