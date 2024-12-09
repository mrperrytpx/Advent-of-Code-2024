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

for (let i = 0, j = diskBlocks.length - 1; i < diskBlocks.length; i++) {
    if (i > j) break;

    if (diskBlocks[i] === ".") {
        let temp = diskBlocks[i];
        diskBlocks[i] = diskBlocks[j];
        diskBlocks[j] = temp;
        j--;

        while (diskBlocks[j] === ".") j--;
    }
}

let checkSum = 0;
for (let i = 0; i < diskBlocks.length; i++) {
    if (diskBlocks[i] === ".") break;
    checkSum += i * +diskBlocks[i];
}

console.log(checkSum);
