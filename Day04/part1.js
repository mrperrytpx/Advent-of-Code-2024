const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function isOutOfBounds(row, col) {
    return (
        row + rowOffset < 0 ||
        row + rowOffset >= file.length ||
        col + colOffset < 0 ||
        col + colOffset >= file[row].length
    );
}

function findXMAS(row, col, i, j) {
    const WORD = "XMAS";

    for (let k = 1; k < WORD.length; k++) {
        const currRow = row + i * k;
        const currCol = col + j * k;

        if (isOutOfBounds(currRow, currCol)) return false;
        if (file[currRow][currCol] !== WORD[k]) return false;
    }

    return true;
}

let xmasCnt = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] === "X") {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;

                    if (findXMAS(row, col, i, j)) {
                        xmasCnt++;
                    }
                }
            }
        }
    }
}

console.log(xmasCnt);
