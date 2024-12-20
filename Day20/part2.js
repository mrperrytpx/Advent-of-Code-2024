const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const strArea = file.join("");
const [ex, ey] = [
    Math.floor(strArea.indexOf("E") / file[0].length),
    strArea.indexOf("E") % file[0].length,
];

const [sx, sy] = [
    Math.floor(strArea.indexOf("S") / file[0].length),
    strArea.indexOf("S") % file[0].length,
];

const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

const path = sim(-1, -1);
function sim(i, j) {
    const pathSet = new Set();
    let queue = [[sx, sy, 0, []]];

    while (queue.length) {
        let [px, py, sec, p] = queue.shift();
        const key = `${[px, py]}`;

        if (pathSet.has(key)) continue;
        pathSet.add(key);
        p.push(key);

        if (px === ex && py === ey) {
            return p;
        }

        for (let [dx, dy] of DIRECTIONS) {
            const [nx, ny] = [px + dx, py + dy];

            if (nx === i && ny === j) {
                queue.push([nx, ny, sec + 1, [...p]]);
                continue;
            }

            if (file[nx][ny] !== "#") {
                queue.push([nx, ny, sec + 1, [...p]]);
            }
        }
    }
}

function distance(start, end) {
    let [sx, sy] = start.split(",");
    let [ex, ey] = end.split(",");

    return Math.abs(+sx - +ex) + Math.abs(+sy - +ey);
}

let pico = 0;
for (let i = 0; i < path.length - 1; i++) {
    let start = path[i];
    for (let j = path.length - 1; j >= i; j--) {
        let end = path[j];

        const dist = distance(start, end);
        if (dist > 20) continue;

        let jumped = path.indexOf(end) - path.indexOf(start) - dist;

        if (jumped >= 100) {
            pico++;
        }
    }
}
console.log(pico);
