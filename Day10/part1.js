const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n")
    .map((x) => x.split("").map(Number));

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

function nextTrails(x, y, nextHeight) {
    const nextTrails = [];
    const DIRECTIONS = [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1],
    ];

    for (let [dx, dy] of DIRECTIONS) {
        const [nx, ny] = [x + dx, y + dy];
        if (isInBounds([nx, ny]) && file[nx][ny] === nextHeight) {
            nextTrails.push([nx, ny]);
        }
    }

    return nextTrails;
}

let trailheadSum = 0;
for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        let height = file[row][col];
        if (height === 0) {
            let trailheads = 0;
            let queue = [[row, col, height + 1]];
            let visitedPeaks = new Set();
            while (queue.length) {
                const [tx, ty, nextHeight] = queue.shift();
                const trails = nextTrails(tx, ty, nextHeight);

                if (!trails.length) continue;

                for (let [nx, ny] of trails) {
                    if (file[nx][ny] === 9) {
                        const key = `${[nx, ny].toString()}`;
                        if (visitedPeaks.has(key)) continue;
                        visitedPeaks.add(key);
                        trailheads++;
                        continue;
                    }
                    queue.push([nx, ny, nextHeight + 1]);
                }
            }

            trailheadSum += trailheads;
        }
    }
}

console.log(trailheadSum);
