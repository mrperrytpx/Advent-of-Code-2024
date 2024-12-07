const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function addMultiAndConcat(arr, curr, tar, i = 1) {
    if (i === arr.length) {
        return curr === tar;
    }

    const next = arr[i];
    const add = curr + next;
    const mul = curr * next;
    const concat = Number(`${curr}${next}`);
    i++;

    return (
        (add <= tar && addMultiAndConcat(arr, add, tar, i)) ||
        (mul <= tar && addMultiAndConcat(arr, mul, tar, i)) ||
        (concat <= tar && addMultiAndConcat(arr, concat, tar, i))
    );
}

let sumOfCalibrations = 0;
for (let row of file) {
    let [res, opps] = row.split(": ");

    res = Number(res);
    opps = opps.split(" ").map(Number);

    let doesProduceRes = addMultiAndConcat(opps, opps[0], res);

    if (doesProduceRes) sumOfCalibrations += res;
}

console.log(sumOfCalibrations);
