/**
 * Definition for knows()
 * 
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

const knows = function(a, b) {
  // const graph = [
  //   [1,0],
  //   [0,1]
  // ];
  const graph = [
    [1,1,0],
    [0,1,0],
    [1,1,1]
  ];
  console.log(a, b);
  return graph[a][b] === 1;
};

// /**
//  * @param {function} knows()
//  * @return {function}
//  */
// var solutionN2 = function(knows) { // O(n²)
//   /**
//    * @param {integer} n Total people
//    * @return {integer} The celebrity
//    */
//   return function(n) {
//       const newNode = { in: 0, out: 0 };
//       const stats = {};
//       for (let i = 0; i < n; i++) {
//           for (let j = 0; j < n; j++) {
//             if (i === j) continue;
//             if (knows(i, j)) {
//                 if (!stats[i]) stats[i] = Object.assign({}, newNode);
//                 if (!stats[j]) stats[j] = Object.assign({}, newNode);
//                 stats[i].out++;
//                 stats[j].in++;
//             }
//           }
//       }
//       console.log(stats);

//       const celebrity = Object.keys(stats).find(person => {
//         if (stats[person].in === n - 1 && stats[person].out === 0 ) return person;
//         return false;
//       });

//       return celebrity ? Number(celebrity) : -1;
//   };
// };

var solutionN = function(knows) { // O(n)
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function(n) {
    let celebrity = 0;
    for (let i = 1; i < n; i++) {
      if (knows(celebrity, i)) celebrity = i;
    }

    for (let i = 0; i < n; i++) {
      if (i === celebrity) continue;
      if (knows(celebrity, i)) return -1;
    }

    let peopleKnowCelebrityCount = 0;
    for (let i = 0; i < n; i++) {
      if (i === celebrity) continue;
      if (knows(i, celebrity)) peopleKnowCelebrityCount++;
    }

    if (peopleKnowCelebrityCount < n - 1) return -1;

    return celebrity;
  };
};

// console.log('celebrity', solutionN2(knows)(3));
console.log('celebrity', solutionN(knows)(3));