const grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];

// grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]

class Point {
  constructor(type, colNum, rowNum) {
    this.type = type; // 1 | 0
    this.neighbors = [];
    this.colNum = colNum;
    this.rowNum = rowNum;
  }
  addNeighbor(neighbor) {
    this.neighbors.push(neighbor);
  }
  getNeighbors() {
    return this.neighbors;
  }
  isLand() {
    return this.type === '1';
  }
}

var numIslands = function(grid) {
  const visited = new Set();
  const graph = [];
  
  grid.forEach((row, rowNum) => {
    row.forEach((item, colNum) => {
      if (graph[rowNum] === undefined) graph[rowNum] = [];
      graph[rowNum][colNum] = new Point(item, colNum, rowNum);
    })
  });
  
  const columnPos = [-1, 1, 0, 0];
  const rowPos = [0, 0, -1, 1];
  
  let resultGraph = [];
  
  graph.forEach((row, rowNum) => {
    row.forEach((point, colNum) => {
      rowPos.forEach((val, i) => {
        if (graph[rowNum + val] !== undefined && graph[rowNum + val][colNum + columnPos[i]] !== undefined) {
          const neighbor = graph[rowNum + val][colNum + columnPos[i]];
          point.addNeighbor(neighbor);
        }
      });
    })
    resultGraph = resultGraph.concat(row);
  });
  
  let islandsCount = 0;
  
  const stack = [];
  
  for (const point of resultGraph) {
    stack.push(point);
    let islandStarted = false;
    while (stack.length > 0) {
      const stackPoint = stack.pop();
      if (!stackPoint.isLand()) continue;
      if (visited.has(stackPoint)) continue;
      visited.add(stackPoint);
      islandStarted = true;
      for (const neighbor of stackPoint.getNeighbors()) {
        stack.push(neighbor);
      }
    }
  
    if (islandStarted === true) islandsCount++;
  }

  return islandsCount;
};

console.log(numIslands(grid));