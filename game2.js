const EASY = { rows: 12, cols: 12, mines: 20 };
const MEDIUM = { rows: 16, cols: 16, mines: 40 };
const HARD = { rows: 20, cols: 32, mines: 60 };

let board = [];
let mines = [];
let revealed = [];
let gameOver = false;
let isFlagMode = false;

document.getElementById('easy').addEventListener('click', () => startGame(EASY));
document.getElementById('medium').addEventListener('click', () => startGame(MEDIUM));
document.getElementById('hard').addEventListener('click', () => startGame(HARD));
document.getElementById('flag-mode').addEventListener('click', () => {
  isFlagMode = !isFlagMode;
  document.getElementById('flag-mode').textContent = isFlagMode ? '取消标雷' : '标雷模式';
});

function startGame(difficulty) {
  gameOver = false;
  const { rows, cols, mines: mineCount } = difficulty;
  board = Array.from({ length: rows }, () => Array(cols).fill(0));
  revealed = Array.from({ length: rows }, () => Array(cols).fill(false));
  mines = [];

  // 生成地雷
  while (mines.length < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col]) {
      board[row][col] = -1; // -1 表示地雷
      mines.push([row, col]);
    }
  }

  // 计算每个格子周围的地雷数量
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === -1) continue;
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === -1) {
            count++;
          }
        }
      }
      board[row][col] = count;
    }
  }

  renderBoard(rows, cols);
}

function renderBoard(rows, cols) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleCellClick);
      cell.addEventListener('contextmenu', handleRightClick);
      gameBoard.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  if (gameOver) return;

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (isFlagMode) {
    handleRightClick(event);
    return;
  }

  if (board[row][col] === -1) {
    event.target.classList.add('mine');
    gameOver = true;
    alert('游戏结束！你踩到地雷了！');
    revealAllMines();
    return;
  }

  revealCell(row, col);
  checkWin();
}

function handleRightClick(event) {
  event.preventDefault();
  if (gameOver) return;

  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (!revealed[row][col]) {
    cell.classList.toggle('flagged');
    checkWin();
  }
}

function revealCell(row, col) {
  if (revealed[row][col]) return;
  revealed[row][col] = true;

  const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
  cell.classList.add('revealed');
  cell.textContent = board[row][col] || '';

  if (board[row][col] === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
          revealCell(newRow, newCol);
        }
      }
    }
  }
}

function revealAllMines() {
  mines.forEach(([row, col]) => {
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.classList.add('mine');
  });
}

function checkWin() {
  const totalCells = board.length * board[0].length;
  const revealedCells = revealed.flat().filter(Boolean).length;
  const flaggedMines = mines.filter(([row, col]) => {
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    return cell.classList.contains('flagged');
  }).length;

  if (revealedCells + flaggedMines === totalCells && flaggedMines === mines.length) {
    gameOver = true;
    alert('恭喜你，赢了！');
  }
}