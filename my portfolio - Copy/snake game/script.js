const board = document.getElementById('game-board');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let score = 0;

function createGameBoard() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}-${j}`;
            board.appendChild(cell);
        }
    }
}

function drawSnake() {
    snake.forEach(segment => {
        const snakeCell = document.getElementById(`cell-${segment.x}-${segment.y}`);
        snakeCell.classList.add('snake');
    });
}

function drawFood() {
    const foodCell = document.getElementById(`cell-${food.x}-${food.y}`);
    foodCell.classList.add('food');
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function moveSnake() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === 'right') headX++;
    if (direction === 'left') headX--;
    if (direction === 'up') headY--;
    if (direction === 'down') headY++;

    const newHead = { x: headX, y: headY };

    if (headX === food.x && headY === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
        drawFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    const snakeBody = document.querySelectorAll('.snake');
    snakeBody.forEach(segment => segment.classList.remove('snake'));
    drawSnake();

    if (checkCollision()) {
        clearInterval(gameLoop);
        alert('Game over! Your score: ' + score);
    }
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

createGameBoard();
drawSnake();
drawFood();
updateScore();
const gameLoop = setInterval(moveSnake, 100);