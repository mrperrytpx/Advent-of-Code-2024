const readFile = require("fs").readFileSync;
let line = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "");

const REGEX = /((mul\()(\d+,\d+)\))/gm;
const matchedStrs = line.match(REGEX);

let sumOfInstructions = 0;

for (let str of matchedStrs) {
    const [a, b] = str
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number);
    sumOfInstructions += a * b;
}

console.log(sumOfInstructions);
