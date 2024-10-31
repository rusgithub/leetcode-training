/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  const graph = {};
  const existingPairs = {};
  let visited = {};

  const createEdge = (from ,to, cost) => ({ from, to, cost });

  prerequisites.forEach(([secondCourse, firstCourse], index) => {
      let cost = 1;
      if (existingPairs[`${secondCourse}-${firstCourse}`]) cost = -2;
      existingPairs[`${firstCourse}-${secondCourse}`] = true;
      if (graph[firstCourse] === undefined) graph[firstCourse] = []; 
      graph[firstCourse].push(createEdge(firstCourse, secondCourse, cost));
  });

  // console.log(graph);

  const distances = Array.from({ length: numCourses})
      .fill(Number.POSITIVE_INFINITY);
  distances[0] = 0;

  const dfs = (from) => {
      if (graph[from] === undefined || visited[from]) return;
      visited[from] = true;

      for (const edge of graph[from]) {
          // console.log(from, edge.cost, edge.to);
          if (distances[from] + edge.cost < distances[edge.to]) {
              distances[edge.to] = edge.cost;
              dfs(edge.to);
          }
      }
  }

  for (let i = 0; i < numCourses; i++) {
    dfs(i);
  }

  let canFinish = true;

  const dfsForNegative = (from) => {
    if (graph[from] === undefined || visited[from]) return;
    visited[from] = true;
    for (const edge of graph[from]) {
        // console.log(edge.cost);
        if (distances[from] + edge.cost < distances[edge.to]) {
            canFinish = false;
            return
            // distances[edge.to] = Number.NEGATIVE_INFINITY;
            dfsForNegative(edge.to);
        }
    }
  }

  visited = {};
  const propogateNegativeCycles = () => {
    for (let i = 0; i < numCourses; i++) {
      dfsForNegative(i);
    }
  }

  propogateNegativeCycles();

  // console.log('distances', distances);

  return canFinish;
};

console.log(canFinish(2, [[1,0]]));
console.log(canFinish(2, [[1,0],[0,1]]));
console.log(canFinish(2, [[0,1],[1,0]]));
console.log(canFinish(2, [[0,1],[1,0]]));
console.log(canFinish(2, [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]]));