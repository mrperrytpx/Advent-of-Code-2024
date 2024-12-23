const readFile = require("fs").readFileSync;
let file = readFile(__dirname + "/input.txt", "utf-8")
    .replace(/\r/g, "")
    .split("\n");

const interCon = {};
for (let connection of file) {
    const [left, right] = connection.split("-");

    interCon[left] = interCon[left] || [];
    interCon[left].push(right);

    interCon[right] = interCon[right] || [];
    interCon[right].push(left);
}

// 1586-fast-algorithms-for-the-maximum-clique-problem-on-massive-graphs-with-applications-to-overlapping-community-detection.pdf
// page 424 in upper left corner

function maxClique(graph) {
    // max ← lb
    let maxSize = 1;
    let maxClique = [];
    const computers = Object.keys(graph);
    // for i : 1 to n do
    for (let i = 0; i < computers.length; i++) {
        const comp = computers[i];
        // if d(vi) ≥ max then
        if (graph[comp].length >= maxSize) {
            // Pruning 1
            // U ← ∅
            let candidateNeighbors = new Set();
            // for each vj ∈ N(vi) do
            for (const connection of graph[comp]) {
                const index = computers.indexOf(connection);
                // if j>i then
                if (index > i) {
                    // Pruning 2
                    // if d(vj) ≥ max then
                    if (graph[connection].length >= maxSize) {
                        // Pruning 3
                        // U ← U ∪ {vj}
                        candidateNeighbors.add(connection);
                    }
                }
            }
            // Clique(G, U, 1) and the current clique members
            clique(graph, candidateNeighbors, 1, [comp]);
        }
    }

    function clique(graph, candidateNeighbors, size, currClique) {
        // if U = ∅ then
        if (candidateNeighbors.size === 0) {
            // if size > max then
            if (size > maxSize) {
                // new largest clique found
                // max ← size
                maxSize = size;
                maxClique = [...currClique];
            }
            return;
        }

        // while |U| > 0 do
        while (candidateNeighbors.size > 0) {
            // if size + |U| ≤ max then
            if (size + candidateNeighbors.size <= maxSize) {
                // Pruning 4
                return;
            }

            // Select any vertex u from U
            const nextComp = Array.from(candidateNeighbors)[0];
            // U ← U \ {u}
            candidateNeighbors.delete(nextComp);

            // N(u) := {w|w ∈ N(u) ∧ d(w) ≥ max}
            const nextCompNeighbours = new Set(
                graph[nextComp].filter((w) => graph[w].length >= maxSize)
            ); // Pruning 5

            // U ∩ N(u)
            const intersections = [...candidateNeighbors].filter((v) =>
                nextCompNeighbours.has(v)
            );

            // Clique(G, U ∩ N(u), size + 1)
            clique(graph, new Set([...intersections]), size + 1, [
                ...currClique,
                nextComp,
            ]);
        }
    }

    return maxClique;
}

const largestClique = maxClique(interCon).sort().join(",");
console.log(largestClique);
