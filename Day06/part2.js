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

let startGuardPos = [];
let startGuardDirIdx = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] !== "#" && file[row][col] !== ".") {
            startGuardPos = [row, col];
            startGuardDirIdx = GUARD_SHAPES.indexOf(file[row][col]);
        }
    }
}

let startGuardDir = GUARD_DIRECTIONS[startGuardDirIdx];

function isOutOfBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row < 0 || row >= file.length || col < 0 || col >= file[row].length;
}

function guardsPath(guardPos, guardDir, guardDirIdx, returnPath = true) {
    let stateSet = new Set();
    const isInfinitePath = !returnPath;

    while (true) {
        let state = `${guardPos}:${guardDirIdx % GUARD_DIRECTIONS.length}`;

        if (isInfinitePath) {
            if (stateSet.has(state)) return true;
            stateSet.add(state);
        } else {
            stateSet.add(guardPos.toString());
        }

        const nextGuardPos = [
            guardPos[0] + guardDir[0],
            guardPos[1] + guardDir[1],
        ];

        if (isOutOfBounds(nextGuardPos)) {
            return isInfinitePath ? false : stateSet;
        }

        if (file[nextGuardPos[0]][nextGuardPos[1]] === "#") {
            guardDirIdx++;
            guardDir = GUARD_DIRECTIONS[guardDirIdx % GUARD_DIRECTIONS.length];
            continue;
        }

        guardPos = nextGuardPos;
    }
}

const initialPath = guardsPath(startGuardPos, startGuardDir, startGuardDirIdx);

let infinites = 0;
for (let point of initialPath) {
    const [row, col] = point.split(",");
    file[row][col] = "#";

    if (guardsPath(startGuardPos, startGuardDir, startGuardDirIdx, false)) {
        infinites++;
    }

    file[row][col] = ".";
}

console.log(infinites);
