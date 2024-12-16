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

const DIRECTIONS = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
};

const path = new Set();
let queue = [[sx, sy, 0, "right"]];
let minScore = Number.POSITIVE_INFINITY;

while (queue.length) {
    queue.sort((a, b) => a[2] - b[2]);
    let [px, py, currScore, dir] = queue.shift();
    if (currScore > minScore) continue;

    const key = `${[px, py, dir]}`;
    if (path.has(key)) continue;
    path.add(key);

    if (px === ex && py === ey) {
        minScore = Math.min(minScore, currScore);
        continue;
    }

    for (let [d, [dx, dy]] of Object.entries(DIRECTIONS)) {
        const [nx, ny] = [px + dx, py + dy];
        if (file[nx][ny] !== "#") {
            const cost = dir === d ? 1 : 1001;
            queue.push([nx, ny, currScore + cost, d]);
        }
    }
}

console.log(minScore);
