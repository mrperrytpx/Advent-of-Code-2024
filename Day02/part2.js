const fs = require("fs");

const file = fs
    .readFileSync(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.split(" ").map(Number));

let numOfSafetyReports = 0;

function checkRow(row) {
    const direction = row[0] - row[1];

    if (direction === 0 || Math.abs(direction) > 3) {
        return 0;
    }

    const isAscending = direction < 0;

    for (let i = 1; i < row.length - 1; i++) {
        if (
            (isAscending && row[i] >= row[i + 1]) ||
            (!isAscending && row[i] <= row[i + 1]) ||
            Math.abs(row[i] - row[i + 1]) > 3
        ) {
            return i;
        }
    }

    return -1;
}

for (const row of file) {
    const faultyIdx = checkRow(row);

    if (faultyIdx === -1) {
        numOfSafetyReports++;
        continue;
    }

    const hydra = [
        faultyIdx > 0 && [
            ...row.slice(0, faultyIdx - 1),
            ...row.slice(faultyIdx),
        ],
        [...row.slice(0, faultyIdx), ...row.slice(faultyIdx + 1)],
        faultyIdx < row.length - 1 && [
            ...row.slice(0, faultyIdx + 1),
            ...row.slice(faultyIdx + 2),
        ],
    ].filter(Boolean);

    if (hydra.some((head) => checkRow(head) === -1)) {
        numOfSafetyReports++;
    }
}

console.log(numOfSafetyReports);
