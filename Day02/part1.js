const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(" ").map(Number));

let safeReports = 0;

for (let row of file) {
    const direction = row[0] - row[1];

    if (direction === 0 || Math.abs(direction) > 3) continue;

    const isAscending = direction < 0;

    let flagged = false;

    for (let i = 0; i < row.length - 1; i++) {
        if (
            (isAscending && row[i] >= row[i + 1]) ||
            (!isAscending && row[i] <= row[i + 1]) ||
            Math.abs(row[i] - row[i + 1]) > 3
        ) {
            flagged = true;
            break;
        }
    }

    if (flagged) continue;
    safeReports++;
}

console.log(safeReports);
