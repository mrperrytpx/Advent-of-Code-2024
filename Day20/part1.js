const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

let sx,
    sy = 0;
let ex,
    ey = 0;
for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[0].length; j++) {
        if (file[i][j] === "S") {
            sx = i;
            sy = j;
        }
        if (file[i][j] === "E") {
            ex = i;
            ey = j;
        }
    }
}

const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

const path = sim();
function sim() {
    const pathSet = new Set();
    let queue = [[sx, sy, []]];

    while (queue.length) {
        let [px, py, p] = queue.shift();

        const key = `${[px, py]}`;
        if (pathSet.has(key)) continue;
        pathSet.add(key);
        p.push(key);

        if (px === ex && py === ey) return p;

        for (let [dx, dy] of DIRECTIONS) {
            const [nx, ny] = [px + dx, py + dy];
            if (file[nx][ny] !== "#") {
                queue.push([nx, ny, [...p]]);
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
        if (dist > 2) continue;
        let jumped = path.indexOf(end) - path.indexOf(start) - dist;
        if (jumped >= 100) {
            pico++;
        }
    }
}
console.log(pico);
