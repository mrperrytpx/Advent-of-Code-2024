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

            let xDiff = nextAntenna[0] - currAntenna[0];
            let yDiff = nextAntenna[1] - currAntenna[1];

            const traceAntinodes = (antenna, xDiff, yDiff) => {
                while (true) {
                    let newAntenna = [antenna[0] + xDiff, antenna[1] + yDiff];
                    if (!isInBounds(newAntenna)) break;
                    antinodes.add(newAntenna.toString());
                    antenna = newAntenna;
                }
            };

            traceAntinodes(currAntenna, xDiff, yDiff);
            traceAntinodes(nextAntenna, -xDiff, -yDiff);
        }
    }
}

console.log(antinodes.size);
