
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  function traverse(nums) {
    if (nums.length === 0) return undefined;
    if (nums.length === 1) return new TreeNode(nums[0]);

    const centerNodePos = Math.floor((nums.length - 1) / 2);
    
    return new TreeNode(
        nums[centerNodePos],
        traverse(nums.slice(0, centerNodePos)),
        traverse(nums.slice(centerNodePos + 1))
    )
  }

  return traverse(nums);
};

console.log(sortedArrayToBST([-10,-3,0,5,9]));
