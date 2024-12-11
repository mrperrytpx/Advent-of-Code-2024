const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split(" ")
    .map(Number);

const NUM_OF_BLINKS = 75;
const YEAR = 2024;

let stonesMap = new Map();
for (let stone of file) {
    stonesMap.set(stone, (stonesMap.get(stone) || 0) + 1);
}

for (let blink = 0; blink < NUM_OF_BLINKS; blink++) {
    let nextStonesMap = new Map();
    for (let [stone, count] of stonesMap) {
        if (stone === 0) {
            nextStonesMap.set(1, (nextStonesMap.get(1) || 0) + count);
            continue;
        }

        let stoneAsStr = stone.toString();
        if (stoneAsStr.length % 2 === 0) {
            let left = +stoneAsStr.slice(0, stoneAsStr.length / 2);
            let right = +stoneAsStr.slice(stoneAsStr.length / 2);
            nextStonesMap.set(left, (nextStonesMap.get(left) || 0) + count);
            nextStonesMap.set(right, (nextStonesMap.get(right) || 0) + count);
            continue;
        }

        nextStonesMap.set(
            stone * YEAR,
            (nextStonesMap.get(stone * YEAR) || 0) + count
        );
    }

    stonesMap = nextStonesMap;
}

let stoneCount = 0;
for (let [_, count] of stonesMap) {
    stoneCount += count;
}

console.log(stoneCount);
