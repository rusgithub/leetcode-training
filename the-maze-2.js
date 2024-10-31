const maze = [
  [0,0,1,0,0],
  [0,0,0,0,0],
  [0,0,0,1,0],
  [1,1,0,1,1],
  [0,0,0,0,0]
];

// incorrect result
var shortestDistance = function(maze, start, destination) {
  const directions = [[0, -1, 'left'], [0, 1, 'right'], [-1, 0, 'down'], [1, 0, 'up']];
  const directionsMap = {
    'left': [0, -1],
    'right': [0, 1],
    'down': [-1, 0],
    'up': [1, 0, ]
  };
  
  let minDist = Number.POSITIVE_INFINITY;

  function dfs(row, col, steps = 0, direction = 'left') {
    const [rowShift, colShift] = directionsMap[direction];
    if (
      maze[row] === undefined
      || maze[row][col] !== 0
      || (maze[row][col] === '#' && maze[row + rowShift] && maze[row + rowShift][col + colShift] !== 0)
    ) return;
    
    maze[row][col] = '#';

    if (
      row === destination[0]
      && col === destination[1]
      && maze[row + rowShift]
      && (maze[row + rowShift][col + colShift] === 1 || maze[row + rowShift][col + colShift] === undefined)
    ) {
      minDist = Math.min(minDist, steps);
      return;
    };

    steps++;

    dfs(row + rowShift, col + colShift, steps, direction);
    directions.forEach(([r, c, dir]) => {
      if (dir !== direction) {
        dfs(row + r, col + c, steps, dir)
      }
    });
  }

  dfs(start[0], start[1]);

  return minDist === Number.POSITIVE_INFINITY ? -1 : minDist;
};

console.log('result', shortestDistance(maze, [0,4], [4,4]));