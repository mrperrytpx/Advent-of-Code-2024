const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const GUARD_SHAPES = ["^", ">", "v", "<"];
const GUARD_DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

let visited = [];
let obstacles = [];
let guardDir = [];
let guardDirIdx = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (GUARD_SHAPES.includes(file[row][col])) {
            const guard = [row, col];
            const shape = file[row][col];

            visited.push(guard);

            guardDirIdx = GUARD_SHAPES.indexOf(shape);
            guardDir = GUARD_DIRECTIONS[guardDirIdx];
        }

        if (file[row][col] === "#") {
            obstacles.push(JSON.stringify([row, col]));
        }
    }
}

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

let guardPos = visited[0];

while (isInBounds(guardPos)) {
    visited.push(guardPos);
    const nextGuardPos = [guardPos[0] + guardDir[0], guardPos[1] + guardDir[1]];

    if (obstacles.includes(JSON.stringify(nextGuardPos))) {
        guardDirIdx++;
        guardDir = GUARD_DIRECTIONS[guardDirIdx % 4];
        continue;
    }

    guardPos = nextGuardPos;
}

visited = visited.map((x) => x.toString());

console.log(new Set(visited).size);
