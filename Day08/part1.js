const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(""));

let antennas = {};

for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        if (file[i][j] !== ".") {
            if (!antennas[file[i][j]]) {
                antennas[file[i][j]] = [];
            }
            antennas[file[i][j]].push([i, j]);
        }
    }
}

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

let pos = new Set();

for (let antenna in antennas) {
    for (let i = 0; i < antennas[antenna].length; i++) {
        for (let j = i + 1; j < antennas[antenna].length; j++) {
            let [x1, y1] = antennas[antenna][i];
            let [x2, y2] = antennas[antenna][j];

            let xDiff = Math.abs(x2 - x1);
            let yDiff = (y2 - y1) * -1;

            let firstAA = [x1 - xDiff, y1 + yDiff];
            let secondAA = [x2 + xDiff, y2 - yDiff];

            if (isInBounds(firstAA)) {
                pos.add(firstAA.toString());
            }

            if (isInBounds(secondAA)) {
                pos.add(secondAA.toString());
            }
        }
    }
}

console.log(pos.size);
