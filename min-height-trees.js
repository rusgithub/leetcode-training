var findMinHeightTrees = function(n, edges) {
  if (n === 1) return [0];
  const tree = {};
  let remainingNodes = n;
  const degrees = {};

  edges.forEach(([from, to]) => {
      if (!tree[from]) tree[from] = [];
      if (!tree[to]) tree[to] = [];
      if (!degrees[from]) degrees[from] = 0;
      if (!degrees[to]) degrees[to] = 0;
      tree[from].push(to);
      tree[to].push(from);
      degrees[from]++;
      degrees[to]++;
  });

  let leaves = [];
  Object.entries(degrees).forEach(([node, degree]) => {
      if (degree === 1) leaves.push(parseInt(node));
  });

  const findTreeCenters = (tree) => {
    while (remainingNodes > 2) {
      let nextLeaves = new Set();
      leaves.forEach(leave => {
        degrees[leave]--;
        const neighbors = tree[leave];
        neighbors.forEach(neighbor => {
          if (degrees[neighbor] !== 0) {
            degrees[neighbor]--;
            if (degrees[neighbor] === 1) {
              nextLeaves.add(neighbor);
            }
          }
        });
      });
      remainingNodes -= leaves.length;
      leaves = [...nextLeaves];
    }
    return leaves;
  };

  return findTreeCenters(tree);
};

// findMinHeightTrees(4, [[1,0],[1,2],[1,3]]);
// findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]]);
// findMinHeightTrees(2, [[0,1]]);
// const result = findMinHeightTrees(6, [[0,1],[0,2],[0,3],[3,4],[4,5]]);
// const result = findMinHeightTrees(7, [[0,1],[1,2],[1,3],[2,4],[3,5],[4,6]]);
console.log(result);
