const fs = require("fs");
let file = fs
    .readFileSync(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const REGEX = /(-?\d+)/gm;
const ROWS = 103;
const COLS = 101;

let step = 1;
while (true) {
    let tree = Array.from({ length: ROWS }, () => Array(COLS).fill("."));
    let robotsSet = new Set();
    for (let line of file) {
        let [pCol, pRow, vCol, vRow] = line.match(REGEX).map(Number);
        const newRobotPos = [
            (((vRow * step + pRow) % ROWS) + ROWS) % ROWS,
            (((vCol * step + pCol) % COLS) + COLS) % COLS,
        ];

        tree[newRobotPos[0]][newRobotPos[1]] = "#";

        const key = `${[newRobotPos[0], newRobotPos[1]]}`;
        if (robotsSet.has(key)) continue;
        robotsSet.add(key);
    }

    if (robotsSet.size === file.length) {
        for (let line of tree) {
            fs.appendFileSync(
                __dirname + `/steps/output-${step}.txt`,
                line + "\n",
                "utf8"
            );
        }
    }

    step++;
    if (step === 10000) break;
}
