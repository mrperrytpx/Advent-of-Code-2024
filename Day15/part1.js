const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

let area = file[0].split("\n");
const strArea = area.join("");
let [rx, ry] = [
    Math.floor(strArea.indexOf("@") / area[0].length),
    strArea.indexOf("@") % area[0].length,
];

const movementMap = {
    "<": [0, -1],
    "^": [-1, 0],
    ">": [0, 1],
    v: [1, 0],
};

area = area.map((x) => x.split(""));
area[rx][ry] = ".";

const instructions = file[1].replaceAll("\n", "");
for (let ins of instructions) {
    const [dx, dy] = movementMap[ins];
    const [nx, ny] = [rx + dx, ry + dy];
    const inFront = area[nx][ny];

    if (inFront === "#") continue;

    if (inFront === ".") {
        rx = nx;
        ry = ny;
        continue;
    }

    if (inFront === "O") {
        for (let i = nx, j = ny; ; i += dx, j += dy) {
            let curr = area[i][j];
            let next = area[i + dx][j + dy];

            if (next === "#") break;

            if (curr === "O" && next === ".") {
                area[nx][ny] = ".";
                area[i + dx][j + dy] = "O";
                rx = nx;
                ry = ny;
                break;
            }
        }
    }
}

let sumOfGPS = 0;
for (let i = 0; i < area.length; i++) {
    for (let j = 0; j < area[i].length; j++) {
        if (area[i][j] === "O") {
            sumOfGPS += 100 * i + j;
        }
    }
}

console.log(sumOfGPS);
