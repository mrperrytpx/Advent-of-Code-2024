const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("");

let diskBlocks = [];

for (let i = 0, id = 0; i < file.length; i++) {
    let amount = +file[i];
    if (id % 2 === 0) {
        diskBlocks.push(
            ...Array.from({ length: amount }, () => (id / 2).toString())
        );
    } else {
        const dots = ".".repeat(amount);
        diskBlocks.push(...dots);
    }

    id++;
}

for (let i = diskBlocks.length - 1; i >= 0; i--) {
    const tar = diskBlocks[i];
    if (tar === ".") continue;

    let j = i;
    while (diskBlocks[j] !== "." && diskBlocks[j] === tar) j--;

    if (j < 0) break;

    const digitsLen = i - j;

    for (let d = 0; d <= j; d++) {
        if (diskBlocks[d] !== ".") continue;

        let dj = d;
        while (diskBlocks[dj] === ".") dj++;

        const dotsLen = dj - d;
        if (dotsLen >= digitsLen) {
            for (let k = 0; k < digitsLen; k++) {
                diskBlocks[d + k] = diskBlocks[j + 1 + k];
                diskBlocks[j + 1 + k] = ".";
            }
            break;
        }
        d = dj;
    }

    i = j + 1;
}

let checkSum = 0;
for (let i = 0; i < diskBlocks.length; i++) {
    const id = diskBlocks[i];
    if (id !== ".") {
        checkSum += +id * i;
    }
}

console.log(checkSum);
