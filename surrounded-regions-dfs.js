// const grid = [
//   ["X","X","X","X"],
//   ["X","O","O","X"],
//   ["X","X","O","X"],
//   ["X","O","X","X"]
// ];

const grid = [
  ["O","O","O"],
  ["O","O","O"],
  ["O","O","O"]
];

const grid2 = [
  ["O","X","O"],
  ["X","O","X"],
  ["O","X","O"]
];

const grid3 = [
  ["O","X","O"],
  ["X","O","X"],
  ["O","O","O"]
];

const grid4 = [
  ["X","X","X","X","X"],
  ["X","O","O","O","X"],
  ["X","O","O","O","X"],
  ["X","O","O","O","X"],
  ["X","X","X","X","X"]
];

const positions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function dfs(board, row, col, visited) {
  console.log(row, col);
  if (board[row] === undefined || board[row][col] === undefined || visited[`${row}-${col}`] === true ) return;
  visited[`${row}-${col}`] = true;
  if (board[row][col] === 'O') {
    let isSurrounded = true;
    positions.forEach(([rowShift, colShift]) => {
      // const next = board[row + rowShift] && board[row + rowShift][col + colShift];
      // if (next === undefined) isSurrounded = false; // break;
      next && dfs(board, row + rowShift, col + colShift, visited);
    });

    if (isSurrounded) {
      board[row][col] = 'X';
    }
  }
}

var solve = function(board) {
  const visited = {};

  for (let rowNum = 0; rowNum < board.length; rowNum++) {
    for (let colNum = 0; colNum < board[rowNum].length; colNum++) {
      dfs(board, rowNum, colNum, visited);
    }
  }

  return board;
};

console.log(solve(grid));