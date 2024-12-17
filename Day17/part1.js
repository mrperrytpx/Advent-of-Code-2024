const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const REGEX = /(\d+)/gm;

let [regA, regB, regC] = file[0].match(REGEX).map(Number);
const program = file[1].match(REGEX).map(Number);

let finalStr = [];
for (let i = 0; ; i += 2) {
    if (i > program.length) break;
    const combo = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: regA,
        5: regB,
        6: regC,
    };
    const p = program[i];
    const operand = program[i + 1];

    if (p === 0) regA = Math.trunc(regA / 2 ** combo[operand]);
    if (p === 1) regB = regB ^ operand;
    if (p === 2) regB = ((combo[operand] % 8) + 8) % 8;
    if (p === 3) {
        if (regA === 0) continue;
        i = operand;
        i -= 2;
    }
    if (p === 4) regB = regB ^ regC;
    if (p === 5) {
        const out = ((combo[operand] % 8) + 8) % 8;
        finalStr.push(out);
    }
    if (p === 6) regB = Math.trunc(regA / 2 ** combo[operand]);
    if (p === 7) regC = Math.trunc(regA / 2 ** combo[operand]);
}

console.log(finalStr.join(","));
