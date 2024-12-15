const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");

const area = file[0].split("\n").map((x) => x.split(""));
let newArea = area.map((row) =>
    row
        .map((char) => {
            if (char === "@") return char + ".";
            if (char === "O") return "[" + "]";

            return char + char;
        })
        .join("")
);

const strArea = newArea.join("");
let [rx, ry] = [
    Math.floor(strArea.indexOf("@") / newArea[0].length),
    strArea.indexOf("@") % newArea[0].length,
];

const instructions = file[1].replaceAll("\n", "");
const movementMap = {
    "<": [0, -1],
    "^": [-1, 0],
    ">": [0, 1],
    v: [1, 0],
};

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

    if (newArea[nx][ny] === "[" || newArea[nx][ny] === "]") {
        // something here
    }
}

let sumOfGPS = 0;
for (let i = 0; i < newArea.length; i++) {
    for (let j = 0; j < newArea[i].length; j++) {
        if (newArea[i][j] === "[") {
            sumOfGPS += 100 * i + j;
        }
    }
}

console.log(sumOfGPS);
