const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function isOutOfBounds(row, col, rowOffset = 0, colOffset = 0) {
    return (
        row + rowOffset < 0 ||
        row + rowOffset >= file.length ||
        col + colOffset < 0 ||
        col + colOffset >= file[row].length
    );
}

function findNeighbouringMs(row, col) {
    let neighbours = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const currRow = row + i;
            const currCol = col + j;

            if (isOutOfBounds(currRow, currCol)) continue;

            if (file[currRow][currCol] !== "M") continue;

            neighbours.push([currRow, currCol]);
        }
    }

    return neighbours;
}

let xmasCnt = 0;

for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        if (file[row][col] === "X") {
            const neighbours = findNeighbouringMs(row, col);

            if (!neighbours.length) continue;

            for (let [nRow, nCol] of neighbours) {
                // direction from "X" to "M"
                const [dRow, dCol] = [nRow - row, nCol - col];

                if (isOutOfBounds(row, col, dRow * 2, dCol * 2)) continue;
                if (file[row + dRow * 2][col + dCol * 2] !== "A") continue;
                if (isOutOfBounds(row, col, dRow * 3, dCol * 3)) continue;
                if (file[row + dRow * 3][col + dCol * 3] !== "S") continue;

                xmasCnt++;
            }
        }
    }
}

console.log(xmasCnt);
