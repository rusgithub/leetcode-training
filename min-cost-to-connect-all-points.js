// [[0,0],[2,2],[3,10],[5,2],[7,0]] // 20

class Edge {
  constructor(from, to, cost) {
    this.from = from;
    this.to = to;
    this.cost = cost;
  }
}

// const groupToNodes = {
//   blue: [0, 1]
//   red: [2, 3]
// }

// const nodesToGroup = {
//   0: blue,
//   1: blue,
//   2: red
//   3: red
// };

var minCostConnectPoints = function(points) {
  const edges = [];
  const traverse = (points, start) => {
    if (start === points.length - 1) return;
    for (let i = start + 1; i < points.length; i++) {
      const dist = Math.abs(points[start][0] - points[i][0])
          + Math.abs(points[start][1] - points[i][1]);
          edges.push(new Edge(start, i, dist));
    }
    traverse(points, ++start);
  };

  traverse(points, 0);

  edges.sort((a, b) => a.cost - b.cost);

  console.log(edges);

  const groupNodes = {};
  const nodesToGroup = {};
  let group = 0;
  let minSpanningTree = [];

  for (const edge of edges) {
    if (nodesToGroup[edge.from] !== undefined && nodesToGroup[edge.from] === nodesToGroup[edge.to]) {
      continue
    } else if (nodesToGroup[edge.from] === undefined && nodesToGroup[edge.to] === undefined) {
      group++;
      groupNodes[group] = [edge.from, edge.to];
      nodesToGroup[edge.from] = group;
      nodesToGroup[edge.to] = group;

      // check
      if (groupNodes[group].length === points.length) {
        minSpanningTree = groupNodes[group];
        break;
      };

      continue;
    } else if (nodesToGroup[edge.from] && nodesToGroup[edge.to]) {
      const nextGroup = nodesToGroup[edge.from];
      groupNodes[edge.to].forEach(element => {
        nodesToGroup[element] = nextGroup;
        groupNodes[edge.from].push(element);
      });

      // check
      if (groupNodes[edge.from].length === points.length) {
        minSpanningTree = groupNodes[edge.from];
        break;
      };

      delete groupNodes[edge.to];
    } else if (nodesToGroup[edge.from] || nodesToGroup[edge.to]) {
      const nextGroup = nodesToGroup[edge.from] || nodesToGroup[edge.to];
      if (!nodesToGroup[edge.from]) {
        groupNodes[nextGroup].push(edge.from);
      } else {
        groupNodes[nextGroup].push(edge.to);
      }

      // check
      if (groupNodes[nextGroup].length === points.length) {
        minSpanningTree = groupNodes[nextGroup];
        break;
      };

      nodesToGroup[edge.from] = nextGroup;
      nodesToGroup[edge.to] = nextGroup;
    }
  }
  
  // console.log(minSpanningTree);

  let result = 0;
  const calculateMinDist = (minPoints) => {
      for (let i = 0; i < minPoints.length - 2; i++) {
        const dist = Math.abs(points[minPoints[i]][0] - points[minPoints[i + 1]][0])
            + Math.abs(points[minPoints[i]][1] - points[minPoints[i + 1]][1]);
        result += dist;
      }

      return result
  };

  return calculateMinDist(minSpanningTree, 0);
};

console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]]));
// console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]]));