const targetRow = "cat";

const targetRowIdx = targetRow && [targetRow];

console.log(targetRowIdx);

const arr = [1, 2, 3];

let number: number = 1;

arr.forEach((num) => number < num && (num = num));
console.log(number);
