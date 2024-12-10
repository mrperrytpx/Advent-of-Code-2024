const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function isInBounds(coords) {
    const row = coords[0];
    const col = coords[1];
    return row >= 0 && row < file.length && col >= 0 && col < file[row].length;
}

function checkNeighbours(coords, num) {
    const x = coords[0];
    const y = coords[1];
    const validNeighbours = [];
    const DIRECTIONS = [
        [0, -1],
        [-1, 0],
        [1, 0],
        [0, 1],
    ];

    for (let dir of DIRECTIONS) {
        const [nx, ny] = [x + dir[0], y + dir[1]];
        if (isInBounds([nx, ny]) && +file[nx][ny] === num) {
            validNeighbours.push([nx, ny]);
        }
    }

    return validNeighbours;
}

let trailSum = 0;
for (let row = 0; row < file.length; row++) {
    for (let col = 0; col < file[row].length; col++) {
        let curr = +file[row][col];
        if (curr === 0) {
            let trailheads = 0;
            let queue = [[[row, col], 1]];
            let heads = new Set();

            while (queue.length) {
                const [pos, num] = queue.shift();
                const neighbours = checkNeighbours(pos, num);
                for (let [nx, ny] of neighbours) {
                    if (+file[nx][ny] === 9) {
                        const key = `${[nx, ny].toString()}`;
                        if (heads.has(key)) continue;
                        heads.add(key);
                        trailheads++;
                    }
                    queue.push([[nx, ny], num + 1]);
                }
            }

            trailSum += trailheads;
        }
    }
}

console.log(trailSum);
