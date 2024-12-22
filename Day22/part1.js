const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map(Number);

const MODULO = 16777216;

let sum = 0;

for (let secretNum of file) {
    for (let i = 0; i < 2000; i++) {
        let multimixprune =
            ((((secretNum * 64) ^ secretNum) % MODULO) + MODULO) % MODULO;
        secretNum = multimixprune;

        let dividemixprune =
            (((Math.floor(secretNum / 32) ^ secretNum) % MODULO) + MODULO) %
            MODULO;
        secretNum = dividemixprune;

        let multimixprune2 =
            ((((secretNum * 2048) ^ secretNum) % MODULO) + MODULO) % MODULO;
        secretNum = multimixprune2;
    }

    sum += secretNum;
}

console.log(sum);
