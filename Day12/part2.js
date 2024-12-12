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

function countCorners(values, region) {
    function checkPoint(x, y, region) {
        return (
            isInBounds([x, y]) &&
            file[x][y] === region &&
            values.some(([vx, vy]) => vx === x && vy === y)
        );
    }

    let corners = 0;

    const minX = Math.min(...values.map(([vx, _]) => vx));
    const maxX = Math.max(...values.map(([vx, _]) => vx));
    const minY = Math.min(...values.map(([_, vy]) => vy));
    const maxY = Math.max(...values.map(([_, vy]) => vy));

    for (let x = minX; x <= maxX + 1; x++) {
        for (let y = minY; y <= maxY + 1; y++) {
            const a = checkPoint(x - 1, y - 1, region);
            const b = checkPoint(x, y - 1, region);
            const c = checkPoint(x - 1, y, region);
            const d = checkPoint(x, y, region);

            const square = [a, b, c, d];
            const trueCount = square.filter(Boolean).length;

            if (trueCount === 1 || trueCount === 3) {
                corners += 1;
            } else if (trueCount === 2 && ((b && c) || (a && d))) {
                corners += 2;
            }
        }
    }

    return corners;
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
        plotSides = countCorners(currentPlot, region);
        totalPrice += plotArea * plotSides;
    }
}

console.log(totalPrice);
