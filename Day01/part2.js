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

let similarityScore = 0;

for (let i = 0; i < left.length; i++) {
    let occurances = 0;

    for (let j = 0; j < right.length; j++) {
        if (left[i] === right[j]) {
            occurances++;
        }
    }

    similarityScore += left[i] * occurances;
}

console.log(similarityScore);
