const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

console.time();

function addMultiAndConcat(arr, curr, tar, i = 1) {
    const next = arr[i];
    const add = curr + next;
    const mul = curr * next;
    const concat = Number(`${curr}${next}`);
    i++;

    if (i === arr.length) {
        return add == tar || mul == tar || concat == tar;
    }

    return (
        (add <= tar && addMultiAndConcat(arr, add, tar, i)) ||
        (mul <= tar && addMultiAndConcat(arr, mul, tar, i)) ||
        (concat <= tar && addMultiAndConcat(arr, concat, tar, i))
    );
}

let sumOfCalibrations = 0;
for (let row of file) {
    let [tar, seq] = row.split(": ");

    tar = Number(tar);
    seq = seq.split(" ").map(Number);

    let canBeTrue = addMultiAndConcat(seq, seq[0], tar);

    if (canBeTrue) sumOfCalibrations += tar;
}

console.log(sumOfCalibrations);
console.timeEnd();
