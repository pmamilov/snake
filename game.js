
const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const grid = 16;
let count = 0;
let score = 0;
let speed = 5;

const snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
}

const apple = {
  x: 320,
  y: 320
}

function genRandomPoint(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);
  if(++count < speed) return;

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;

  if(snake.x >= canvas.width) { snake.x = 0
  } else if(snake.x < 0) {
    snake.x = canvas.width - grid;
  }

  if(snake.y >= canvas.height) { snake.y = 0
  } else if(snake.y < 0) {
    snake.y = canvas.height - grid;
  }

  snake.cells.unshift({x: snake.x, y: snake.y})

  if(snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  context.fillStyle = 'green';

  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    if(cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = genRandomPoint(0,25) * grid;
      apple.y = genRandomPoint(0,25) * grid;
      document.querySelector(".num").innerHTML = ++score;
      if(score % 5===0) {
        --speed;
      }
    }
    for(let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.dx = grid;
        snake.dy = 0;
        snake.cells = [];
        snake.maxCells = 4;
        score = 0;
        speed = 5;
        apple.x = genRandomPoint(0,25) * grid;
        apple.y = genRandomPoint(0,25) * grid;
      }
    }
  })
}

document.addEventListener('keydown', function(event) {
    if(event.code === 'ArrowLeft' && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }
    else if(event.code === 'ArrowRight' && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    else if(event.code === 'ArrowUp' && snake.dy === 0) {
      snake.dx = 0;
      snake.dy = -grid;
    }
    else if(event.code === 'ArrowDown' && snake.dy === 0) {
      snake.dx = 0;
      snake.dy = grid;
    }
})

requestAnimationFrame(loop);
