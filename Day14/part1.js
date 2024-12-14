const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const REGEX = /(-?\d+)/gm;
const SECONDS = 100;
const ROWS = 103;
const COLS = 101;
const MIDDLE_ROW = Math.floor(ROWS / 2);
const MIDDLE_COL = Math.floor(COLS / 2);

const quadrants = [0, 0, 0, 0];
for (let line of file) {
    let [pCol, pRow, vCol, vRow] = line.match(REGEX).map(Number);

    const [nx, ny] = [
        (((vRow * SECONDS + pRow) % ROWS) + ROWS) % ROWS,
        (((vCol * SECONDS + pCol) % COLS) + COLS) % COLS,
    ];

    if (nx < MIDDLE_ROW && ny < MIDDLE_COL) quadrants[0]++;
    if (nx > MIDDLE_ROW && ny < MIDDLE_COL) quadrants[1]++;
    if (nx < MIDDLE_ROW && ny > MIDDLE_COL) quadrants[2]++;
    if (nx > MIDDLE_ROW && ny > MIDDLE_COL) quadrants[3]++;
}

console.log(quadrants.reduce((a, b) => a * b, 1));
