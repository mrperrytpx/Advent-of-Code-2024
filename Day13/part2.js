const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const REGEX = /(X[+=](\d+))|(Y[+=](\d+))/gm;
const PART2 = 10000000000000;

let totalTokens = 0;
for (let line of file) {
    const splitLine = line.split("\n");

    const buttonA = splitLine[0]
        .match(REGEX)
        .map((x) => x.replace("X+", "").replace("Y+", ""));

    const buttonB = splitLine[1]
        .match(REGEX)
        .map((x) => x.replace("X+", "").replace("Y+", ""));

    const prize = splitLine[2]
        .match(REGEX)
        .map((x) => x.replace("X=", "").replace("Y=", ""));

    const ax = +buttonA[0];
    const ay = +buttonA[1];

    const bx = +buttonB[0];
    const by = +buttonB[1];

    const det = ax * by - ay * bx;
    if (det === 0) continue;

    const px = +prize[0] + PART2;
    const py = +prize[1] + PART2;

    const detA = px * by - py * bx;
    const detB = px * ay - py * ax;

    const a = detA / det;
    const b = detB / -det;

    if (a > 0 && b > 0 && a % 1 === 0 && b % 1 === 0) {
        totalTokens += a * 3 + b;
    }
}

console.log(totalTokens);
