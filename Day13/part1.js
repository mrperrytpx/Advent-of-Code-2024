const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const REGEX = /(X[+=](\d+))|(Y[+=](\d+))/gm;

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

    const px = +prize[0];
    const py = +prize[1];

    let a = Math.round((px - (bx * py) / by) / (ax - (bx * ay) / by));
    let b = Math.round((py - ay * a) / by);

    if (a <= 0 || b <= 0) continue;

    if (a > 100 || b > 100) continue;

    if (a % 1 === 0 && ay * a + by * b === py) {
        totalTokens += a * 3 + b;
    }
}

console.log(totalTokens);
