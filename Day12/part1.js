const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

function nextPlots(x, y, region) {
    const nextPlots = [];
    const DIRECTIONS = [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1],
    ];

    for (let [dx, dy] of DIRECTIONS) {
        const [nx, ny] = [x + dx, y + dy];
        if (isInBounds([nx, ny]) && file[nx][ny] === region) {
            nextPlots.push([nx, ny]);
        }
    }

    return nextPlots;
}

let totalPrice = 0;
let visitedRegions = new Set();
for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        let region = file[row][col];
        const key = `${[row, col]}`;

        if (visitedRegions.has(key)) continue;

        visitedRegions.add(key);
        const currentPlot = [[row, col]];
        let plotArea = 0;
        let plotPerimeter = 0;
        const MAX_FENCES = 4;

        let queue = [[row, col, region]];

        while (queue.length) {
            const [x, y, reg] = queue.shift();
            const plots = nextPlots(x, y, reg);

            plotPerimeter += MAX_FENCES - plots.length;

            for (let [px, py] of plots) {
                const plotKey = `${[px, py]}`;

                if (visitedRegions.has(plotKey)) continue;
                visitedRegions.add(plotKey);
                queue.push([px, py, reg]);
                currentPlot.push([px, py]);
            }
        }

        plotArea = currentPlot.length;
        totalPrice += plotArea * plotPerimeter;
    }
}

console.log(totalPrice);
