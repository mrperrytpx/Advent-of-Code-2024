const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const REGEX = /(\d+)/gm;
const PART2 = 10000000000000;

let totalTokens = 0;
for (let line of file) {
    let [ax, ay, bx, by, px, py] = line.match(REGEX).map(Number);

    // https://en.wikipedia.org/wiki/Cramer%27s_rule
    const det = ax * by - ay * bx;
    if (det === 0) continue;

    px = px + PART2;
    py = py + PART2;

    const detA = px * by - py * bx;
    const detB = px * ay - py * ax;

    const a = detA / det;
    const b = -detB / det;
    // ensure b is a positive integer
    // we cannot press the button less than 0 times after all
    // (I don't get it)

    if (a > 0 && b > 0 && a % 1 === 0 && b % 1 === 0) {
        totalTokens += a * 3 + b;
    }
}

console.log(totalTokens);
