const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const towels = file[0].split(", ");
const designes = file[1].split("\n");

function deform(d, towels, memo = {}) {
    if (d in memo) return memo[d];
    if (!d.length) return true;
    for (let t of towels) {
        if (d.startsWith(t)) {
            const remaining = d.slice(t.length);
            if (deform(remaining, towels, memo)) {
                memo[d] = true;
                return true;
            }
        }
    }

    memo[d] = false;
    return false;
}

let possibles = 0;
for (let d of designes) {
    console.log(d);
    if (deform(d, towels)) {
        possibles++;
    }
}

console.log(possibles);
