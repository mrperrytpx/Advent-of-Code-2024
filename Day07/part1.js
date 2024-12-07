const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function addAndMulti(arr, curr, tar, i = 1) {
    if (i === arr.length) {
        return curr === tar;
    }

    const add = curr + arr[i];
    const mul = curr * arr[i];

    i++;
    return (
        (add <= tar && addAndMulti(arr, add, tar, i)) ||
        (mul <= tar && addAndMulti(arr, mul, tar, i))
    );
}

let sumOfCalibrations = 0;
for (let row of file) {
    let [res, opps] = row.split(": ");

    res = Number(res);
    opps = opps.split(" ").map(Number);

    let doesProduceRes = addAndMulti(opps, opps[0], res);

    if (doesProduceRes) sumOfCalibrations += res;
}

console.log(sumOfCalibrations);
