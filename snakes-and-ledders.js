/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
  const endCell = Math.pow(board.length, 2);
  
  if (endCell <= 6) return 1;

  function getCoordinates(cellNum, board) {
    const size = board.length;
    const row = size - Math.ceil(cellNum / size);
    const col = row % 2 === 0
      ? size - ((cellNum - 1) % size) - 1
      : (cellNum - 1) % size;
  
    return [row, col];
  }

  function getNextRange(currCell, board) {
      return [currCell + 1, Math.min(currCell + 6, endCell)]
  }

  function getNextBestCell(currCell, range) {
      let [start, end] = range;

      for (let i = start; i <= end; i++) { // check if there is ledder to the end point
        const [row, col] = getCoordinates(i, board);
        console.log(board[row][col], endCell);
        if (board[row][col] === endCell) { 
            return endCell
        }
    }

      for (let i = start; i <= end; i++) {
          const [row, col] = getCoordinates(i, board);
          if (board[row][col] !== -1 && board[row][col] > i) { // ledder starts
              return board[row][col]
          }
      }

      for (let i = end; i <= start; i--) { // getting maximum possible step without snake's head
        const [row, col] = getCoordinates(i, board);
        if (board[row][col] === -1) {
            return currCell + i;
        }
      }

      return end + 1;
  }

  let currCell = 1;
  let numOfMoves = 0;

  // let i = 0
  while(currCell < endCell) {
      // i++;
      // if (i > 50) break;
      const range = getNextRange(currCell, board);
      const nextBestCell = getNextBestCell(currCell, range);
      
      currCell = nextBestCell;

      numOfMoves++;
  }

  return numOfMoves;
};

// 3 - 
  // 1 2 3
  // 0 1 2
function getCoordinates(cellNum, board) {
  const size = board.length;
  const row = size - Math.ceil(cellNum / size);
  const col = row % 2 === 0
    ? size - ((cellNum - 1) % size) - 1
    : (cellNum - 1) % size;

  return [row, col];
}

// const board = [
//   [-1,-1,-1],
//   [-1,9,8],
//   [-1,8,9]
// ];

// const board = [
//   [-1,4,-1],
//   [6,2,6],
//   [-1,3,-1]
// ];

const board = [
  [-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,35,-1,-1,13,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,15,-1,-1,-1,-1]
];
// const board = [
//   [-1,-1],
//   [-1,3]
// ];

console.log(snakesAndLadders(board));
// console.log(getCoordinates(2, board)); // 5 1
// console.log(getCoordinates(14, board)); // 3 1
// console.log(getCoordinates(6, board)); // 5 5
// console.log(getCoordinates(36, board)); // 0 0

// console.log(getCoordinates(1, board)); //
// console.log(getCoordinates(2, board)); //
// console.log(getCoordinates(3, board)); //
// console.log(getCoordinates(4, board)); // 
// console.log(getCoordinates(5, board)); //