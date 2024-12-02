const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(" ").map(Number));

let numOfSafetyReports = 0;

function checkRow(row) {
    const direction = row[0] - row[1];

    if (direction === 0 || Math.abs(direction) > 3) {
        return 0;
    }

    if (direction < 0) {
        for (let i = 1; i < row.length - 1; i++) {
            if (row[i] >= row[i + 1]) {
                return i;
            }

            if (Math.abs(row[i] - row[i + 1]) > 3) {
                return i;
            }
        }
    } else {
        for (let i = 1; i < row.length - 1; i++) {
            if (row[i] <= row[i + 1]) {
                return i;
            }

            if (Math.abs(row[i] - row[i + 1]) > 3) {
                return i;
            }
        }
    }
    return -1;
}

for (let row of file) {
    let faultyIdx = checkRow(row);

    if (faultyIdx === -1) {
        numOfSafetyReports++;
        continue;
    } else {
        const spliceMinusOne =
            faultyIdx > 0
                ? [...row.slice(0, faultyIdx - 1), ...row.slice(faultyIdx)]
                : [...row];
        const spliceZero = [
            ...row.slice(0, faultyIdx),
            ...row.slice(faultyIdx + 1),
        ];
        const splicePlusOne =
            faultyIdx < row.length - 1
                ? [...row.slice(0, faultyIdx + 1), ...row.slice(faultyIdx + 2)]
                : [...row];

        for (let idk of [spliceMinusOne, spliceZero, splicePlusOne]) {
            let isStillFaulty = checkRow(idk);
            if (isStillFaulty === -1) {
                numOfSafetyReports++;
                break;
            } else {
            }
        }
    }
}

console.log(numOfSafetyReports);
