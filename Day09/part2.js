const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("");

let newStr = [];

for (let i = 0, id = 0; i < file.length; i++) {
    let amount = +file[i];
    if (id % 2 === 0) {
        newStr.push(Array.from({ length: amount }, () => (id / 2).toString()));
    } else {
        if (amount > 0) newStr.push(".".repeat(amount).split(""));
    }
    id++;
}

newStr = newStr.flat();

let moved = new Set();

for (let i = newStr.length - 1; i >= 0; i--) {
    const tar = newStr[i];

    if (tar === "." || moved.has(tar)) continue;

    moved.add(tar);

    let j = i;
    while (newStr[j] !== "." && newStr[j] === tar) {
        j--;
    }

    if (j < 0) break;

    const digitsLen = i - j;
    const digitsSlice = newStr.slice(j + 1, i + 1);

    for (let d = 0; d <= j; d++) {
        if (newStr[d] !== ".") continue;

        let dj = d;
        while (newStr[dj] === ".") {
            dj++;
        }

        const dotLen = dj - d;

        if (dotLen >= digitsLen) {
            const newDots = ".".repeat(digitsLen).split("");

            newStr.splice(d, digitsLen, ...digitsSlice);
            newStr.splice(j + 1, digitsLen, ...newDots);
            break;
        }
        d = dj;
    }

    i = j + 1;
}

let checkSum = 0;
for (let i = 0; i < newStr.length; i++) {
    const id = newStr[i];
    if (id !== ".") {
        checkSum += +id * i;
    }
}

console.log(checkSum);
