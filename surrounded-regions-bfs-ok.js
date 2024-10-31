// const grid = [
//   ["X","X","X","X"],
//   ["X","O","O","X"],
//   ["X","X","O","X"],
//   ["X","O","X","X"]
// ];

// const grid = [
//   ["O","O","O"],
//   ["O","O","O"],
//   ["O","O","O"]
// ];

// const grid2 = [
//   ["O","X","O"],
//   ["X","O","X"],
//   ["O","X","O"]
// ];

// const grid = [
//   ["O","X","O"],
//   ["X","O","X"],
//   ["O","O","O"]
// ];

// const grid4 = [
//   ["X","X","X","X","X"],
//   ["X","O","O","O","X"],
//   ["X","O","O","O","X"],
//   ["X","O","O","O","X"],
//   ["X","X","X","X","X"]
// ];

// const grid = [
//   ["X","X","X","X","X"],
//   ["X","O","O","O","X"],
//   ["X","O","O","O","X"],
//   ["X","O","O","O","X"],
//   ["X","X","X","X","X"]
// ];

const grid = [
  ["X","X","X","X","X","X"],
  ["X","O","O","O","X","X"],
  ["X","O","O","O","X","X"],
  ["X","O","O","O","X","X"],
  ["X","X","X","X","X","X"],
  ["X","X","X","X","X","X"],
  ["X","X","X","X","X","X"],
  ["X","X","X","X","O","X"],
  ["O","X","X","X","X","X"],
];


const positions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

let surroundedCount = 0;

function bfs(board, points, visited, islands) {
  for (const [row, col] of points) {
    if (board[row] === undefined || board[row][col] === undefined || visited[`${row}-${col}`] === true ) continue;

    visited[`${row}-${col}`] = true;

    if (board[row][col] === 'O') {
      islands.push([row, col]);

      const nextToVisit = [];
      let hasUnsurrounded = false; // goes over the edge
      for (const [rowShift, colShift] of positions) {
        const next = board[row + rowShift] && board[row + rowShift][col + colShift];
        if (next === undefined) hasUnsurrounded = true;
        nextToVisit.push([row + rowShift, col + colShift]);
      };
      if (!hasUnsurrounded) surroundedCount++;

      bfs(board, nextToVisit, visited, islands);
    }
  }
}

function mark(board, points) {
  points.forEach(([row, col]) => {
    board[row][col] = 'X';
  });
}

var solve = function(board) {
  const visited = {};

  for (let rowNum = 1; rowNum < board.length; rowNum++) {
    for (let colNum = 1; colNum < board[rowNum].length; colNum++) {
      const islands = [];
      surroundedCount = 0;
      bfs(board, [[rowNum, colNum]], visited, islands);
      console.log(islands, surroundedCount);
      if (islands.length === surroundedCount) mark(board, islands);
    }
  }

  return board;
};


const res = solve(grid);
console.log(res);