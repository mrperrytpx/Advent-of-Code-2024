const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(" ").map(Number));

let safeReports = 0;

for (let row of file) {
    const direction = row[0] - row[1];

    if (direction === 0 || Math.abs(direction) > 3) continue;

    if (direction < 0) {
        let flag = false;
        for (let i = 1; i < row.length - 1; i++) {
            if (row[i] >= row[i + 1]) {
                flag = true;
                break;
            }

            if (Math.abs(row[i] - row[i + 1]) > 3) {
                flag = true;
                break;
            }
        }
        if (flag) continue;
        safeReports++;
    } else {
        let flag = false;
        for (let i = 1; i < row.length - 1; i++) {
            if (row[i] <= row[i + 1]) {
                flag = true;
                break;
            }

            if (Math.abs(row[i] - row[i + 1]) > 3) {
                flag = true;
                break;
            }
        }
        if (flag) continue;
        safeReports++;
    }
}

console.log(safeReports);
