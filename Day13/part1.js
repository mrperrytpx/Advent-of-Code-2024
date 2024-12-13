const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const REGEX = /(\d+)/gm;

let totalTokens = 0;
for (let line of file) {
    let [ax, ay, bx, by, px, py] = line.match(REGEX).map(Number);

    // (px,py)=a*(ax,ay)+b*(bx,by) linear algebra shit
    // px = a*ax + b*bx
    // py = a*ay + b*ay
    // solver for a, insert into b
    let a = Math.round((px - (bx * py) / by) / (ax - (bx * ay) / by));
    let b = Math.round((py - ay * a) / by);

    if (a <= 0 || b <= 0) continue;

    if (a > 100 || b > 100) continue;

    if (a % 1 === 0 && ay * a + by * b === py) {
        totalTokens += a * 3 + b;
    }
}

console.log(totalTokens);
