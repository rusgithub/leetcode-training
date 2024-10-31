var lengthOfLongestSubstring = function(str) {
  let maxLength = Number.NEGATIVE_INFINITY;
  const positions = new Map();
  let lastStop = 0;

  let currentLength = 0;

  for (let i = 0; i < str.length; i++) {
    const prevPos = positions.get(str.charAt(i));
    if (prevPos !== undefined && prevPos >= lastStop) {
      console.log(i, str.charAt(i), currentLength, prevPos, lastStop);
      currentLength = i - prevPos;
      lastStop = prevPos + 1;
    } else {
      currentLength++;
    }

    positions.set(str.charAt(i), i);

    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
};

// abcabcbb
// pcbakbczxyqpbb
                                      //  s  3
console.log(lengthOfLongestSubstring('abcabcbb'));
                                        // s
console.log(lengthOfLongestSubstring('pwwkew'));

                                        // s
console.log(lengthOfLongestSubstring('bbtablud'));
// console.log(lengthOfLongestSubstring('au'));



// very efficient !
// /**
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLongestSubstring = function(str) {
//   let start = 0;

//   const uniqueLetters = new Set();
//   const lastIndexes = new Map();

//   let maxLength = Number.NEGATIVE_INFINITY;

//   for (let current = 0; current < str.length; current++) {
//       if (uniqueLetters.has(str.charAt(current))) {
//           start = Math.max(start, lastIndexes.get(str.charAt(current)) + 1);
//       }
      
//       uniqueLetters.add(str.charAt(current));
//       lastIndexes.set(str.charAt(current), current);
      
//       maxLength = Math.max(maxLength, current - start + 1);
//   }

//   return isFinite(maxLength) ? maxLength : 0;
// };
