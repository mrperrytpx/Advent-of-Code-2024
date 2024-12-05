const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const splitIdx = file.indexOf("");

const orderRules = file.slice(0, splitIdx);
const pagesToProduce = file.slice(splitIdx + 1).map((x) => x.split(","));

const obj = {};
for (let order of orderRules) {
    const [left, right] = order.split("|");

    obj[left] = obj[left] || [];
    obj[left].push(right);

    obj[right] = obj[right] || [];
}

let sumOfPageNums = 0;
for (let page of pagesToProduce) {
    let needsFixing = false;
    for (let i = 1; i < page.length; i++) {
        if (!obj[page[i - 1]].includes(page[i])) {
            needsFixing = true;
            break;
        }
    }

    if (!needsFixing) continue;

    for (let i = 1; i < page.length; i++) {
        if (!obj[page[i - 1]].includes(page[i])) {
            let temp = page[i];
            page[i] = page[i - 1];
            page[i - 1] = temp;
            i = 0;
        }
    }

    sumOfPageNums += +page[(page.length - 1) / 2];
}

console.log(sumOfPageNums);
