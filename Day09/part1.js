const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("");

let newStr = [];

for (let i = 0, id = 0; i < file.length; i++) {
    let amount = +file[i];

    if (id % 2 === 0) {
        newStr.push(Array.from({ length: amount }, () => (id / 2).toString()));
    } else {
        if (amount > 0) newStr.push(".".repeat(amount).split(""));
    }
    id++;
}

newStr = newStr.flat();

for (let i = 0, j = newStr.length - 1; i < newStr.length; i++) {
    if (i > j) break;

    if (newStr[i] === ".") {
        let temp = newStr[i];
        newStr[i] = newStr[j];
        newStr[j] = temp;

        j--;

        while (newStr[j] === ".") j--;
    }
}

let checkSum = 0;

for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] === ".") break;
    checkSum += i * +newStr[i];
}

console.log(checkSum);
