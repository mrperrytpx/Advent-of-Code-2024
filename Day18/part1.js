const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const ROWS = 71;
const COLS = 71;
const SIM = 1024;

let [sx, sy] = [0, 0];
let [ex, ey] = [ROWS - 1, COLS - 1];

function isInBounds(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

let step = 0;
let queue = [[sy, sx, step]];
let path = new Set();

while (queue.length) {
    let [py, px, s] = queue.shift();

    const key = [py, px].toString();
    if (path.has(key)) continue;
    path.add(key);

    if (px === ex && py === ey) {
        console.log(s);
        break;
    }

    for (let [dy, dx] of DIRECTIONS) {
        const [ny, nx] = [py + dy, px + dx];
        const corr = file.slice(0, SIM).indexOf([ny, nx].toString());
        if (isInBounds(ny, nx) && corr === -1) {
            queue.push([ny, nx, s + 1]);
        }
    }
}
