const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split(" ")
    .map(Number);

const NUM_OF_BLINKS = 25;
const YEAR = 2024;

for (let blink = 0; blink < NUM_OF_BLINKS; blink++) {
    for (let i = 0; i < file.length; i++) {
        let stone = file[i];

        if (stone === 0) {
            file[i] = 1;
            continue;
        }

        if (stone.toString().length % 2 === 0) {
            let left = stone.toString().slice(0, stone.toString().length / 2);
            let right = stone.toString().slice(stone.toString().length / 2);

            file[i] = +left;
            file.splice(i, 0, +right);
            i++;
            continue;
        }

        file[i] = file[i] * YEAR;
    }
}

console.log(file.length);
