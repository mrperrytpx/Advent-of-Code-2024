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

let init = sim(-1, -1);

function sim(i, j) {
    const path = new Set();
    let distMap = new Map();
    let queue = [[sx, sy, 0]];

    while (queue.length) {
        let [px, py, sec] = queue.shift();
        const key = `${[px, py]}`;

        if (distMap.get(key) < sec) continue;
        distMap.set(key, sec);

        if (path.has(key)) continue;
        path.add(key);

        if (px === ex && py === ey) {
            return sec;
        }

        for (let [dx, dy] of DIRECTIONS) {
            const [nx, ny] = [px + dx, py + dy];

            if (nx === i && ny === j) {
                queue.push([nx, ny, sec + 1]);
                continue;
            }

            if (file[nx][ny] !== "#") {
                queue.push([nx, ny, sec + 1]);
            }
        }
    }
}

let pico = 0;
for (let i = 1; i < file.length - 1; i++) {
    for (let j = 1; j < file[i].length - 1; j++) {
        if (file[i][j] === "#") {
            console.log([i, j]);
            let seconds = sim(i, j);
            if (init - seconds >= 100) {
                pico++;
            }
        }
    }
}
console.log(pico);
