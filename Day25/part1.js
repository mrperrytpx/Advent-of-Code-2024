const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n")
    .map((x) => x.split("\n"));

function isMatching(lock, key) {
    for (let i = 0; i < lock.length; i++) {
        for (let j = 0; j < lock[i].length; j++) {
            if (lock[i][j] === "#" && key[i][j] === "#") {
                return false;
            }
        }
    }

    return true;
}

let locks = [];
let keys = [];
let pattern = /([#####])/;
for (let schematic of file) {
    if (pattern.test(schematic[0])) {
        locks.push(schematic);
    }

    if (pattern.test(schematic[schematic.length - 1])) {
        keys.push(schematic);
    }
}

let sum = 0;
for (let l of locks) {
    for (let k of keys) {
        if (isMatching(l, k)) sum++;
    }
}

console.log(sum);
