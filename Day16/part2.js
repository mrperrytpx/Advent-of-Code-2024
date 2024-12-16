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

let queue = [[sx, sy, 0, "right", []]];
let minScore = Number.POSITIVE_INFINITY;
let allPathsCoords = [];
let distMap = new Map();

while (queue.length) {
    let [px, py, currScore, dir, p] = queue.shift();
    const key = `${[px, py, dir]}`;

    if (distMap.get(key) < currScore) {
        continue;
    }

    distMap.set(key, currScore);
    p.push(key);

    if (px === ex && py === ey) {
        if (currScore < minScore) {
            minScore = currScore;
            allPathsCoords = [...p];
        } else if (currScore === minScore) {
            allPathsCoords.push(...p);
            continue;
        }
    }

    for (let [d, [dx, dy]] of Object.entries(DIRECTIONS)) {
        const [nx, ny] = [px + dx, py + dy];
        if (file[nx][ny] !== "#") {
            const cost = dir === d ? 1 : 1001;
            queue.push([nx, ny, currScore + cost, d, [...p]]);
        }
    }
}

allPathsCoords = allPathsCoords.map((x) => x.split(",").slice(0, 2).join(","));

console.log(new Set([...allPathsCoords]).size);
