const readFile = require("fs").readFileSync;
let line = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "");

const REGEX = /((mul\()(\d+,\d+)\))|(don't\(\))|(do\(\))/gm;
const matchedStrs = line.match(REGEX);

let sumOfInstructions = 0;
let isEnabled = true;

for (let str of matchedStrs) {
    if (str === "do()") {
        isEnabled = true;
        continue;
    }

    if (str === "don't()") {
        isEnabled = false;
        continue;
    }

    if (!isEnabled) continue;

    const [a, b] = str
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(Number);

    sumOfInstructions += a * b;
}

console.log(sumOfInstructions);
