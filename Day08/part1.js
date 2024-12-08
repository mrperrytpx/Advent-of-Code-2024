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

let antinodes = new Set();

for (let name in antennas) {
    for (let i = 0; i < antennas[name].length; i++) {
        for (let j = i + 1; j < antennas[name].length; j++) {
            let currAntenna = antennas[name][i];
            let nextAntenna = antennas[name][j];

            let xDiff = Math.abs(nextAntenna[0] - currAntenna[0]);
            let yDiff = (nextAntenna[1] - currAntenna[1]) * -1;

            let firstAA = [currAntenna[0] - xDiff, currAntenna[1] + yDiff];
            let secondAA = [nextAntenna[0] + xDiff, nextAntenna[1] - yDiff];

            if (isInBounds(firstAA)) {
                antinodes.add(firstAA.toString());
            }

            if (isInBounds(secondAA)) {
                antinodes.add(secondAA.toString());
            }
        }
    }
}

console.log(antinodes.size);
