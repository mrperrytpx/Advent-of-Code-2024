const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const towels = file[0].split(", ");
const designes = file[1].split("\n");

function deform(d, towels, memo = {}) {
    if (d in memo) return memo[d];
    if (!d.length) return 1;

    let count = 0;

    for (let t of towels) {
        if (d.startsWith(t)) {
            const remaining = d.slice(t.length);
            count += deform(remaining, towels, memo);
        }
    }

    memo[d] = count;
    return count;
}

let sum = 0;
for (let d of designes) {
    sum += deform(d, towels);
}
console.log(sum);
