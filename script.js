class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;

        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate;
                        previous[nextNeighbor] = smallest;
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return { path: path.concat(smallest).reverse(), cost: distances[finish] };
    }
}

var graph = new WeightedGraph();
graph.addVertex("ITU");
graph.addVertex("RSL");
graph.addVertex("VID");
graph.addVertex("RDE");
graph.addVertex("RCA");
graph.addVertex("STA");
graph.addVertex("AUR");
graph.addVertex("PGE");
graph.addVertex("TAI");
graph.addVertex("POU");
graph.addVertex("IMB");
graph.addVertex("CHA");
graph.addVertex("LAU");
graph.addVertex("SAL");
graph.addVertex("MIR");

graph.addEdge("ITU", "RSL", 52);
graph.addEdge("ITU", "AUR", 26);
graph.addEdge("RSL", "VID", 87);
graph.addEdge("RSL", "AUR", 42);
graph.addEdge("RSL", "IMB", 114.4);
graph.addEdge("RSL", "LAU", 39);
graph.addEdge("VID", "PGE", 347.6);
graph.addEdge("RDE", "RCA", 105);
graph.addEdge("RDE", "PGE", 264);
graph.addEdge("RDE", "TAI", 70);
graph.addEdge("RCA", "STA", 25);
graph.addEdge("RCA", "TAI", 81.4);
graph.addEdge("STA", "TAI", 73.5);
graph.addEdge("AUR", "IMB", 117);
graph.addEdge("PGE", "TAI", 219);
graph.addEdge("PGE", "CHA", 180.4);
graph.addEdge("PGE", "SAL", 50);
graph.addEdge("TAI", "POU", 158.4);
graph.addEdge("TAI", "VAL", 43);
graph.addEdge("POU", "SAL", 129);
graph.addEdge("POU", "MIR", 51);
graph.addEdge("CHA", "LAU", 286);
graph.addEdge("LAU", "SAL", 62);
graph.addEdge("SAL", "MIR", 144);

function findShortestPath() {
    const origin = document.getElementById("origem").value;
    const destination = document.getElementById("destino").value;
    const result = graph.Dijkstra(origin, destination);
    const path = result.path.join(" -> ");
    const cost = result.cost;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<strong>Caminho mais curto:</strong> ${path}<br><strong>Custo total:</strong> ${cost}`;
}