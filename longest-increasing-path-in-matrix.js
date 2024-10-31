/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {
  const positions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  const pathLengths = {};

  matrix.forEach((row, i) => {
      row.forEach((val, j) => {
          pathLengths[`${i}-${j}`] = 1;
      });
  });

  const visited = {};

  let maxLength = 0;

  function dfs(row, col) {
    visited[`${row}-${col}`] = true;
    for (const [rowShift, colShift] of positions) {
      if (!matrix[row + rowShift] || !matrix[row + rowShift][col + colShift]) continue;
      if (matrix[row + rowShift][col + colShift] > matrix[row][col]) {
          let path = pathLengths[`${row + rowShift}-${col + colShift}`] + 1
          if (!visited[`${row + rowShift}-${col + colShift}`]) {
              path = dfs(row + rowShift, col + colShift) + 1;
          }
          
          pathLengths[`${row}-${col}`] = Math.max(pathLengths[`${row}-${col}`], path);
      }
    }

    maxLength = Math.max(maxLength, pathLengths[`${row}-${col}`])

    return pathLengths[`${row}-${col}`];
  }

  matrix.forEach((row, i) => {
    row.forEach((_, j) => {
        !visited[`${i}-${j}`] && dfs(i, j);
    });
  });

  return maxLength;
}


console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]]));