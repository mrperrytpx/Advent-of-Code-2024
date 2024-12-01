const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.replace(/\s+/g, ",").split(",").map(Number));

let left = [];
let right = [];

for (let i = 0; i < file.length; i++) {
    left.push(file[i][0]);
    right.push(file[i][1]);
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let cumulativeDistance = 0;

for (let i = 0; i < left.length; i++) {
    cumulativeDistance += Math.abs(right[i] - left[i]);
}

console.log(cumulativeDistance);
