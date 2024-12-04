const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const acceptableShapes = ["MSMS", "MMSS", "SSMM", "SMSM"];

function isOutOfBounds(row, col) {
    return row < 0 || row >= file.length || col < 0 || col >= file[row].length;
}

function findDiagonals(row, col) {
    let shape = "";

    for (let i = -1; i <= 1; i += 2) {
        for (let j = -1; j <= 1; j += 2) {
            const currRow = row + i;
            const currCol = col + j;

            if (isOutOfBounds(currRow, currCol)) continue;

            shape += file[currRow][currCol];
        }
    }

    return shape;
}

let xmasCnt = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] === "A") {
            let shape = findDiagonals(row, col);

            if (acceptableShapes.some((x) => x === shape)) {
                xmasCnt++;
            }
        }
    }
}

console.log(xmasCnt);
