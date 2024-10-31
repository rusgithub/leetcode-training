class Node {
  constructor(id) {
    this.id = id;
    this.children = new Set();
  }

  addChild(node) {
    this.children.add(node);
  }
}

var treeDiameter = function(edges) {
  if (edges.length === 0) return 0;
  const createTree = (edges) => {
    const map = new Map();
    edges.forEach(([from, to]) => {
      let nodeFrom = map.get(from);
      if (!nodeFrom) {
        nodeFrom = new Node(from);
        map.set(from, nodeFrom);
      }
      let nodeTo = map.get(to);
      if (!nodeTo) {
        nodeTo = new Node(to);
        map.set(to, nodeTo);
      }
      nodeFrom.addChild(nodeTo);
      nodeTo.addChild(nodeFrom);
    });

    return map;
  }

  const tree = createTree(edges);

  let visited = new Set();

  let max = 0;
  let pointB = 0;

  const dfs = (node, dist) => {
    if (visited.has(node)) return;
    visited.add(node);
    dist++;
    console.log('node.id, dist', node.id, dist);
    if (dist > max) {
      max = dist;
      pointB = node.id;
    };
    if (node.children.size === 0) return;
    node.children.forEach(childNode => {
      dfs(childNode, dist);
    });
  }

  const startNode = tree.get(0);
  dfs(startNode, -1);
  visited.clear();
  max = 0;

  dfs(tree.get(pointB), -1);
  console.log(tree.get(pointB), pointB, max);

  return max;
};

/**
 * wrong since tree is undirected and has no root node
 * @param {number[][]} edges
 * @return {number}
 */
// var treeDiameter = function(edges) {
//     const createTree = (edges) => {
//       const map = new Map();

//       edges.forEach(([from, to]) => {
//         let nodeFrom = map.get(from);
//         if (!nodeFrom) {
//           nodeFrom = new Node(from);
//           map.set(from, nodeFrom);
//         }

//         let nodeTo = map.get(to);
//         if (!nodeTo) {
//           nodeTo = new Node(to);
//           map.set(to, nodeTo);
//         }

//         if (to > from) {
//           nodeFrom.addChild(nodeTo);
//         } else {
//           nodeTo.addChild(nodeFrom);
//         }
//       });

//       return map.get(0);
//     }

//     const root = createTree(edges);

//     const dfs = (node) => {
//       if (node.children.length === 0) return 1;
//       let max = 0;
//       node.children.forEach(childNode => {
//         max = Math.max(max, dfs(childNode));
//       });

//       return max;
//     }

//     let lengths = [];


//     root.children.forEach(childNode => {
//       lengths.push(dfs(childNode));
//     });

//     lengths.sort();
//     const diameter = lengths >= 2 ? lengths.pop() + lengths.pop() : 0;

//     return diameter;
// };

// console.log(treeDiameter([[0,1],[1,2],[2,3],[1,4],[4,5]]));
console.log('res', treeDiameter([[0,1],[1,2],[0,3],[3,4],[2,5],[3,6]]));