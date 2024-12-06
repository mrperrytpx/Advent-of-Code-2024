const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(""));

const GUARD_SHAPES = ["^", ">", "v", "<"];
const GUARD_DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

let obstacles = [];
let guardDir = [];
let guardPos = [];
let guardDirIdx = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (GUARD_SHAPES.includes(file[row][col])) {
            const guard = [row, col];
            const shape = file[row][col];

            guardPos = guard;
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

let infinites = 0;
for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] === ".") {
            console.log(row, col);
            let visited = new Set();

            const tempObstacles = [...obstacles, JSON.stringify([row, col])];
            let tempGuardDir = guardDir;
            let tempGuardPos = guardPos;
            let tempGuardDirIdx = guardDirIdx;

            while (isInBounds(tempGuardPos)) {
                let state = JSON.stringify([
                    tempGuardPos,
                    GUARD_SHAPES[tempGuardDirIdx % 4],
                ]);

                if (visited.has(state)) {
                    infinites++;
                    file[row][col];
                    break;
                }

                visited.add(state);
                const nextGuardPos = [
                    tempGuardPos[0] + tempGuardDir[0],
                    tempGuardPos[1] + tempGuardDir[1],
                ];

                if (tempObstacles.includes(JSON.stringify(nextGuardPos))) {
                    tempGuardDirIdx++;
                    tempGuardDir = GUARD_DIRECTIONS[tempGuardDirIdx % 4];
                    continue;
                }

                tempGuardPos = nextGuardPos;
            }
        }
    }
}

console.log(infinites);
