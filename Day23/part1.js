const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const interCon = {};
for (let connection of file) {
    const [left, right] = connection.split("-");

    interCon[left] = interCon[left] || [];
    interCon[left].push(right);

    interCon[right] = interCon[right] || [];
    interCon[right].push(left);
}

let all = new Set();
for (let [key, vals] of Object.entries(interCon)) {
    for (let i = 0; i < vals.length; i++) {
        for (let j = 0; j < vals.length; j++) {
            const l = vals[i];
            const r = vals[j];

            if (l === r) continue;

            const lv = interCon[l];
            const rv = interCon[r];

            if (lv.some((x) => x === r) && rv.some((x) => x === l)) {
                if (
                    key.startsWith("t") ||
                    l.startsWith("t") ||
                    r.startsWith("t")
                ) {
                    let str = [key, l, r].sort().join(",");

                    all.add(str);
                }
            }
        }
    }
}

console.log(all.size);
