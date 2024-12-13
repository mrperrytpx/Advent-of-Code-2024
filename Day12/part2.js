const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

const DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

function nextPlots(x, y, region) {
    const nextPlots = [];
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

        const test = [];
        let plotArea = 0;
        let plotSides = 0;

        let queue = [[row, col, region]];
        while (queue.length) {
            const [x, y, reg] = queue.shift();
            const plots = nextPlots(x, y, reg);

            for (let [px, py] of plots) {
                const plotKey = `${[px, py]}`;

                if (visitedRegions.has(plotKey)) continue;

                test.push([
                    [x, y],
                    [px, py],
                ]);

                visitedRegions.add(plotKey);
                queue.push([px, py, reg]);
                currentPlot.push([px, py]);
            }
        }

        plotArea = currentPlot.length;

        function checkPlot(plot, dir) {
            let newRow = plot[0] + dir[0];
            let newCol = plot[1] + dir[1];

            return (
                isInBounds([newRow, newCol]) &&
                file[newRow][newCol] == file[plot[0]][plot[1]]
            );
        }

        for (let plot of currentPlot) {
            for (let i = 0; i < DIRECTIONS.length; i++) {
                let dir = DIRECTIONS[i];
                let dir2 = DIRECTIONS[(i + 1) % 4];

                // convex corner
                if (!checkPlot(plot, dir) && !checkPlot(plot, dir2)) {
                    plotSides++;
                }

                // concave corner
                if (
                    checkPlot(plot, dir) &&
                    checkPlot(plot, dir2) &&
                    !checkPlot(plot, [dir[0] + dir2[0], dir[1] + dir2[1]])
                ) {
                    plotSides++;
                }
            }
        }

        totalPrice += plotArea * plotSides;
    }
}

console.log(totalPrice);
