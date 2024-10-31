// const arr = [2,3,1,2,4,3,2,3,1,2,4,3,2,3,1,2,4,3,2,3,1,2,4,3];
// const nums = [2,3,1,2,4,3];
// const nums = [1,1,1,1,1,1,1,1];
const nums = [1,2,3,4,5];
const target = 11;
const table = {};

const maxDegree = Math.floor(Math.log2(nums.length));

table[0] = nums;

let degree = 1;
while (degree <= maxDegree) {
  table[degree] = Array.from({ length: nums.length });
  degree = degree * 2;
}

degree = 1;
while (degree <= maxDegree) {
  const prevDegree = Math.floor(degree / 2);
  const prevRangeLength = Math.pow(2, prevDegree);
  
  for (let i = 0; i < nums.length; i++) {
    if (table[prevDegree][i + prevRangeLength] === undefined || table[prevDegree][i + prevRangeLength] === '#') {
      table[degree][i] = '#';
      continue;
    }
    table[degree][i] = table[prevDegree][i] + table[prevDegree][i + prevRangeLength];
  }
  degree = degree * 2;
}

console.log('table', table);

let totalSum = 0;
let minSubarrayLength = Number.POSITIVE_INFINITY;

for (let i = 0; i < nums.length; i++) {
  for (let rangeLength = 1; rangeLength <= nums.length; rangeLength++) {
    if (i + rangeLength > nums.length) continue;

    let sum = 0;
    let length = 0;

    const maxDegree = Math.floor(Math.log2(rangeLength));
    let offset = 0;

    let degree = 0;
    while (degree <= maxDegree) {
      const rangeLength = Math.pow(2, degree);
      if (table[degree][i + offset] === '#') {
        sum = 0;
        length = 0;
        break;
      };
      sum += table[degree][i + offset];
      length += rangeLength;

      if (degree === 0) {
        degree = 1;
      } else {
        degree = degree * 2;
      }
      
      offset += rangeLength;
    }

    if (sum >= target && length < minSubarrayLength) {
      totalSum = sum;
      minSubarrayLength = rangeLength;
    }
  }
}

console.log('result', totalSum, minSubarrayLength);