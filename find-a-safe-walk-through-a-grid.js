/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
var findSafeWalk = function(grid, health) {
  const positions = [[-1,0],[1,0],[0,1],[0,-1]];
  const visited = [];
  for (let row in grid) {
      visited[row] = Array.from({ length: grid[row].length}).fill(0);
  }

  function dfs(row, col, health) {
      if (
          row < 0 || col < 0 || row >= grid.length || col >= grid[0].length ||
          visited[row][col] || health < 1
      ) return 0;

      if (grid[row][col] === 1) health--;

      if (health < 1) return 0; // без этого неправильный результат

      visited[row][col] = 1;
      if (row === grid.length - 1 && col === grid[0].length - 1) {
          return health;
      }

      let healthAfterPath = Number.NEGATIVE_INFINITY;
      positions.forEach(([rowShift, colShift]) => {
          healthAfterPath = Math.max(
              healthAfterPath,
              dfs(row + rowShift, col + colShift, health)
          );
      });

      visited[row][col] = 0; // не добавил сначала это

      return healthAfterPath;
  }

  
  const healthAtFinish = dfs(0, 0, health);
  console.log(healthAtFinish);

  return healthAtFinish >= 1;
};
