function dfs(node) {
  if (!node) return 1;

  [].forEach(el => {

    if (next > current) {
      dfs + 1
    }


  });

  return max

}

function dfsLongestChain(node) {
  if (!node) return 0;

  let max = Number.NEGATIVE_INFINITY;

  node.children.forEach(el => {
    const chain = 1 + dfs();
    max = Math.max(max, chain);    
  });

  return max
}

function dfsMaxSum(node) {
  if (!node) return 0;

  let max = node.val;

  node.children.forEach(el => {
    max = Math.max(max, node.val + dfs());    
  });

  return max
}

function dfsLongestIncreasing(node) {
  if (!node) return 0;

  currentIncreasing = 0;

  node.children.forEach(el => {
    if (el.val > node.val) {
      currentIncreasing += 1;
      dfs(el, current.currentIncreasing + 1);
    }
  });

  return max
}


function dfsMaxAvg(node) {
  return max
}