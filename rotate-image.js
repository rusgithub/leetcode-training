/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const size = matrix.length;

  const rotated = new Set();

  function rotateCell(value, row, col, startPoint) {
    const nextRow = col;
    const nextCol = size - row - 1;

    `${nextRow}-${nextCol}` !== startPoint && rotateCell(matrix[nextRow][nextCol], nextRow, nextCol, startPoint);

    matrix[nextRow][nextCol] = value;
    rotated.add(`${nextRow}-${nextCol}`);
 }

 for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    if (!rotated.has(`${row}-${col}`)) {
      rotateCell(matrix[row][col], row, col, `${row}-${col}`);
    }
  }
 }

 return matrix;
};

const matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

console.log(rotate(matrix));