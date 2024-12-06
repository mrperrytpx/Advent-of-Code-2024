const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(""));

const GUARD_DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

console.time();

let guardPos = [];
let guardDir = GUARD_DIRECTIONS[0];

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] !== "#" && file[row][col] !== ".") {
            guardPos = [row, col];
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
            file[row][col] = "#";
            let tempGuardDir = guardDir;
            let tempGuardPos = guardPos;
            let tempGuardDirIdx = 0;
            let visited = new Set();

            while (true) {
                let state = `${[
                    tempGuardPos,
                    tempGuardDirIdx % GUARD_DIRECTIONS.length,
                ]}`;

                if (visited.has(state)) {
                    infinites++;
                    break;
                }

                visited.add(state);
                const nextGuardPos = [
                    tempGuardPos[0] + tempGuardDir[0],
                    tempGuardPos[1] + tempGuardDir[1],
                ];

                if (!isInBounds(nextGuardPos)) {
                    break;
                }

                if (file[nextGuardPos[0]][nextGuardPos[1]] === "#") {
                    tempGuardDirIdx++;
                    tempGuardDir =
                        GUARD_DIRECTIONS[
                            tempGuardDirIdx % GUARD_DIRECTIONS.length
                        ];
                    continue;
                }

                tempGuardPos = nextGuardPos;
            }

            file[row][col] = ".";
        }
    }
}

console.timeEnd();

console.log(infinites);
