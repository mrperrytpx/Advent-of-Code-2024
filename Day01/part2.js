const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.replace(/\s+/g, ",").split(",").map(Number));

let similarityScore = 0;

for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file.length; j++) {
        if (file[i][0] === file[j][1]) {
            similarityScore += file[i][0];
        }
    }
}

console.log(similarityScore);
