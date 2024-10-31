// const arr = [2,3,1,2,4,3,2,3,1,2,4,3,2,3,1,2,4,3,2,3,1,2,4,3];
// const nums = [2,3,1,2,4,3];
// const nums = [1,1,1,1,1,1,1,1];
const nums = [1,2,3,4,5];
const target = 11;

let start = 0;
let end = 0;
let finish = nums.length - 1;

let min = Number.POSITIVE_INFINITY;

let sum = 0;
while (end <= finish) {
  sum += nums[end];
  console.log(sum);
  while (sum >= target) {
    min = Math.min(min, end - start + 1)
    sum -= nums[start];
    start++;
  }

  end++;
}

console.log(isFinite(minSubarrayLength) ? minSubarrayLength : 0);