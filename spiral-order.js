var spiralOrder = function(matrix) {
  if (matrix.length === 0 ) return [];
  if (matrix.length === 1) return matrix[0];

  const n = matrix.length * matrix[0].length;

  const directions = {
      right: [0, 1],
      down: [1, 0],
      left: [0, -1],
      up: [-1, 0],
  }
  
  const sequence = ['right', 'down', 'left', 'up'];
  let minRow = 0;
  let maxRow = matrix.length - 1;
  let minCol = 0;
  let maxCol = matrix[0].length - 1;
  let currentRow = 0;
  let currentCol = 0;
  const result = [];
  result.push(matrix[currentRow][currentCol]);

  let count = 1;

  let circleStartRow = currentRow;
  let circleStartCol = currentCol;
  let circleEnded = false;

  while (count <= n) {
      for (const direction of sequence) {
          if (count >= n) break;

          const [rowShift, colShift] = directions[direction];
          
          while (
              matrix[currentRow + rowShift] !== undefined
              && currentRow + rowShift >= minRow
              && currentRow + rowShift <=maxRow 
              && matrix[currentRow + rowShift][currentCol + colShift] !== undefined
              && currentCol + colShift >= minCol
              && currentCol + colShift <= maxCol
          ) {
              if (
                currentRow + rowShift === circleStartRow
                && currentCol + colShift === circleStartCol
              ) {
                circleEnded = true;
                break;
              };

              count++;
              currentRow = currentRow + rowShift;
              currentCol = currentCol + colShift;

              if (circleEnded) {
                circleStartRow = currentRow;
                circleStartCol = currentCol;
                circleEnded = false;
             }

              result.push(matrix[currentRow][currentCol]);
          }
      }

      minRow++;
      maxRow--;
      minCol++;
      maxCol--;

      if (count >= n) break;
  }

  console.log(result);

  return result;
};

// spiralOrder([[1,2,3],[4,5,6],[7,8,9]]);
// spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]);
// console.log(spiralOrder([[1]]));
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20],[21,22,23,24]]));