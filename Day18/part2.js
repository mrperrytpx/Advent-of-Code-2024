const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const ROWS = 71;
const COLS = 71;

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

for (let i = 0; i < file.length; i++) {
    let queue = [[sy, sx]];
    let path = new Set();
    let found = false;
    const blockedSet = new Set(file.slice(0, i + 1));

    while (queue.length) {
        let [py, px] = queue.shift();
        const key = [py, px].toString();
        if (path.has(key)) continue;
        path.add(key);

        if (px === ex && py === ey) {
            found = true;
            break;
        }

        for (let [dy, dx] of DIRECTIONS) {
            const [ny, nx] = [py + dy, px + dx];
            const corr = blockedSet.has([ny, nx].toString());
            if (isInBounds(ny, nx) && !corr) {
                queue.push([ny, nx]);
            }
        }
    }

    if (!found) {
        console.log(file[i]);
        break;
    }
}
