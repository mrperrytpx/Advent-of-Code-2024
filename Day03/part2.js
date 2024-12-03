const readFile = require("fs").readFileSync;
let line = readFile(__dirname + "/input.txt", "utf-8").replace(/\r/g, "");

const REGEX = /((mul\()(\d+,\d+)\))|(don't\(\))|(do\(\))/gm;

const pairs = line.match(REGEX);

let instructionsSum = 0;
let flag = true;

for (let pair of pairs) {
    if (pair === "do()") {
        flag = true;
        continue;
    }

    if (pair === "don't()") {
        flag = false;
        continue;
    }

    if (!flag) continue;

    const [a, b] = pair.replace("mul(", "").replace(")", "").split(",");

    instructionsSum += a * b;
}

console.log(instructionsSum);
