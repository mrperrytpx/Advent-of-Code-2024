const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.replace(/\s+/g, ",").split(",").map(Number));

let cumulativeDistance = 0;

for (let i = 0; i < file.length; i++) {
    cumulativeDistance += file[i][1] - file[i][0];
}

console.log(cumulativeDistance);
