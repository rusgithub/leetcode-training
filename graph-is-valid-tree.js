var validTree = function(n, edges) {
  if (edges.length === 0 && n === 1) return true; // review
  if (edges.length !== n - 1) return false; // review
  const visited = new Set();

  const graph = new Map();
  edges.forEach(([from, to]) => {
    if (!graph.has(from)) graph.set(from, new Set());
    if (!graph.has(to)) graph.set(to, new Set());
    graph.get(from).add(to);
    graph.get(to).add(from);
  });

  const isValid = (graph, node, parentNode) => {
    if (visited.has(node)) return false;

    visited.add(node);

    const childNodes = graph.get(node);
    for (const childNode of childNodes) { // made a mistake here - childNodes.forEach... when return false inside it returns from the cycle, not from isValid() func
      if (parentNode !== childNode) { // made a mistake here - parentNode === node
        const valid = isValid(graph, childNode, node);
        if (!valid) return false;
      }
    };

    return true;
  };

  if (!isValid(graph, edges[0][0], null)) return false;

  return visited.size === n;
};

console.log('result', validTree(3, [[0,1],[0,2],[1,2]]));
