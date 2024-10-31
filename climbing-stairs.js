var climbStairs = function(n) {
  let pathsCount = 0;
  const climb = (currentPath, remaining) => {
      if (remaining === 0) {
          console.log(currentPath);
          pathsCount++;
          return;
      }

      [1,2].forEach(steps => {
          if (remaining - steps >= 0) {
              climb(currentPath + steps, remaining - steps);
          }
      });
  }

  climb('', n)

  return pathsCount;
};

console.log(climbStairs(3));




// slow - need a dynamic programming approach instead
// var climbStairs = function(n) {
//   let pathsCount = 0;
//   const climb = (remaining) => {
//       if (remaining === 0) {
//           pathsCount++;
//           return;
//       }

//       [1,2].forEach(steps => {
//           if (remaining - steps >= 0) {
//               climb(remaining - steps);
//           }
//       });
//   }

//   climb(n)

//   return pathsCount;
// };

// console.log(climbStairs(44));

// climb(4)
// ├── climb(3)
// │   ├── climb(2)
// │   │   ├── climb(1)
// │   │   │   ├── climb(0) -> путь найден
// │   │   └── climb(0) -> путь найден
// │   └── climb(1)
// │       ├── climb(0) -> путь найден
// └── climb(2)
//     ├── climb(1)
//     │   ├── climb(0) -> путь найден
//     └── climb(0) -> путь найден