const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split(""));

let allAntennas = {};

for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
        if (file[i][j] !== ".") {
            if (!allAntennas[file[i][j]]) {
                allAntennas[file[i][j]] = [];
            }
            allAntennas[file[i][j]].push([i, j]);
        }
    }
}

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

let antinodes = new Set();

for (let antenna in allAntennas) {
    for (let i = 0; i < allAntennas[antenna].length; i++) {
        for (let j = i + 1; j < allAntennas[antenna].length; j++) {
            let currAntenna = allAntennas[antenna][i];
            let nextAntenna = allAntennas[antenna][j];

            let xDiff = nextAntenna[0] - currAntenna[0];
            let yDiff = nextAntenna[1] - currAntenna[1];

            while (true) {
                let newNextAntenna = [
                    nextAntenna[0] + xDiff * -1,
                    nextAntenna[1] + yDiff * -1,
                ];
                if (!isInBounds(newNextAntenna)) break;
                antinodes.add(newNextAntenna.toString());
                nextAntenna = newNextAntenna;
            }
            while (true) {
                let newCurrentAntenna = [
                    currAntenna[0] + xDiff,
                    currAntenna[1] + yDiff,
                ];
                if (!isInBounds(newCurrentAntenna)) break;
                antinodes.add(newCurrentAntenna.toString());
                currAntenna = newCurrentAntenna;
            }
        }
    }
}

console.log(antinodes.size);
