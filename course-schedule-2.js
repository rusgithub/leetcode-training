/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

var findOrder = function(numCourses, prerequisites) {
  if (numCourses === 1) return [0];
  const graph = {};
  prerequisites.forEach(([secondCourse, firstCourse]) => {
    if (graph[firstCourse] === undefined) graph[firstCourse] = [];
    graph[firstCourse].push({ from: firstCourse, to: secondCourse });
  });

  const dfs = (graph, to, path, visited) => {
    if (visited[to] === true) return;
    visited[to] = true;

    if (graph[to] !== undefined) {
      for (const edge of graph[to]) {
        visited[edge.to] !== true && dfs(graph, edge.to, reversedPath, visited);
      }
    }
    path.push(to);
  }

  const reversedPath = [];
  const visited = {};
  for (const key in graph) {
    dfs(graph, Number(key), reversedPath, visited);
  }

  if (reversedPath.length !== numCourses) return [];

  return reversedPath.reverse();
};

console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));
