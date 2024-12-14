const fs = require("fs");
let file = fs
    .readFileSync(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const REGEX = /(-?\d+)/gm;
const ROWS = 103;
const COLS = 101;

let step = 1;
outerLoop: while (true) {
    let tree = Array.from({ length: ROWS }, () => Array(COLS).fill("."));
    let robotsSet = new Set();
    for (let line of file) {
        let [pCol, pRow, vCol, vRow] = line.match(REGEX).map(Number);
        const [nx, ny] = [
            (((vRow * step + pRow) % ROWS) + ROWS) % ROWS,
            (((vCol * step + pCol) % COLS) + COLS) % COLS,
        ];

        const key = `${[nx, ny]}`;
        if (robotsSet.has(key)) {
            step++;
            continue outerLoop;
        }
        tree[nx][ny] = "#";
        robotsSet.add(key);
    }

    if (robotsSet.size === file.length) {
        for (let robot of robotsSet) {
            const [x, y] = robot.split(",").map(Number);

            const lkey = `${[x + 1, y - 1]}`;
            const ckey = `${[x + 1, y]}`;
            const rkey = `${[x + 1, y + 1]}`;

            // . # .
            // # # #
            if (
                robotsSet.has(lkey) &&
                robotsSet.has(ckey) &&
                robotsSet.has(rkey)
            ) {
                console.log(step);
                for (let line of tree) {
                    fs.appendFileSync(
                        __dirname + `/output-${step}.txt`,
                        line + "\n",
                        "utf8"
                    );
                }
                return;
            }
        }
    }

    step++;
}
