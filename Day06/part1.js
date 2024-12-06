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

let visited = new Set();
let guardPos = [];
let guardDirIdx = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] !== "#" && file[row][col] !== ".") {
            guardPos = [row, col];
            guardDirIdx = GUARD_SHAPES.indexOf(file[row][col]);
        }
    }
}

function isOutOfBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row < 0 || row >= file.length || col < 0 || col >= file[row].length;
}

let guardDir = GUARD_DIRECTIONS[guardDirIdx];

while (true) {
    visited.add(guardPos.toString());
    const nextGuardPos = [guardPos[0] + guardDir[0], guardPos[1] + guardDir[1]];

    if (isOutOfBounds(nextGuardPos)) break;

    if (file[nextGuardPos[0]][nextGuardPos[1]] === "#") {
        guardDirIdx++;
        guardDir = GUARD_DIRECTIONS[guardDirIdx % 4];
        continue;
    }

    guardPos = nextGuardPos;
}

console.log(visited.size);
