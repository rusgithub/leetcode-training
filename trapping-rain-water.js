/**
 * lavel by level traversal from bottom to the top;
 * hits time limit
 * 
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let max = Number.NEGATIVE_INFINITY;
  for (const elevation of height) {
      max = Math.max(max, elevation);
  }

  let maxTrapped = 0;
  let potentiallyTrapped = 0;
  let isTrapping = false;
  for (let level = 1; level <= max; level++) {
      for (const elevation of height) {
          if (elevation >= level && !isTrapping) {
              isTrapping = true;
              continue;
          }
          if (isTrapping) {
              if (elevation < level) {
                  potentiallyTrapped++;
              } else {
                  maxTrapped += potentiallyTrapped;
                  potentiallyTrapped = 0;
              }
          }
      };

      potentiallyTrapped = 0;
      isTrapping = false;
  }

  return maxTrapped;
};