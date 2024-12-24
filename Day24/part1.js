const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n\n");
const wires = file[0].split("\n");
const gates = file[1].split("\n");

function transform(a, b, op) {
    switch (op) {
        case "XOR": {
            return a ^ b;
        }
        case "AND": {
            return a && b;
        }
        case "OR": {
            return a || b;
        }
        default: {
            throw new Error("Wrong op", op);
        }
    }
}

let map = new Map();
for (let w of wires) {
    let [name, bit] = w.split(": ");
    map.set(name, +bit);
}

let unprocessed = new Set(gates);
while (unprocessed.size > 0) {
    let nextUnprocessed = new Set();
    for (let connection of gates) {
        let [x, op, y, z] = connection.replace("->", "").split(/\s+/);

        if (map.has(x) && map.has(y)) {
            map.set(z, transform(map.get(x), map.get(y), op));
        } else {
            nextUnprocessed.add(connection);
        }
    }

    unprocessed = nextUnprocessed;
}

const validZs = [...map.entries()]
    .filter((x) => x[0].startsWith("z"))
    .sort()
    .reverse();

let binary = "";
for (let z of validZs) binary += z[1];

console.log(parseInt(binary, 2));
