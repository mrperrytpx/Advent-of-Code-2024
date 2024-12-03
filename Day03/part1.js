const readFile = require("fs").readFileSync;
let line = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "");

const REGEX = /((mul\()(\d+,\d+)\))/gm;
const pairs = line.match(REGEX);

let instructionsSum = 0;

for (let pair of pairs) {
    const [a, b] = pair.replace("mul(", "").replace(")", "").split(",");
    instructionsSum += a * b;
}

console.log(instructionsSum);
