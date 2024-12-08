const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

function addAndMulti(arr, curr, tar, i = 1) {
    const next = arr[i];
    const add = curr + next;
    const mul = curr * next;
    i++;

    if (i === arr.length) {
        return add == tar || mul == tar;
    }
    return (
        (add <= tar && addAndMulti(arr, add, tar, i)) ||
        (mul <= tar && addAndMulti(arr, mul, tar, i))
    );
}

let sumOfCalibrations = 0;
for (let row of file) {
    let [tar, seq] = row.split(": ");

    tar = Number(tar);
    seq = seq.split(" ").map(Number);

    let canBeTrue = addAndMulti(seq, seq[0], tar);

    if (canBeTrue) sumOfCalibrations += tar;
}

console.log(sumOfCalibrations);
