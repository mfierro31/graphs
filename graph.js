class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let v of vertex.adjacent) {
      this.removeEdge(vertex, v);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let visited = [];

    while (toVisitStack.length) {
      let currVal = toVisitStack.pop();
      // IMPORTANT: push the values into visited HERE, and NOT in the if block below, otherwise the order will be messed up.
      // In that if block, we're looping through the adjacent nodes of the currVal and adding them to our toVisitStack,
      // so if we add our push line there, we'll store them in a 2 at a time swapped order than we actually visited them.
      // So, ["P", "U", "X", "T"] in toVisitStack will be ["U", "P", "T", "X"] in visited.
      visited.push(currVal.value);
      for (let neighbor of currVal.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      let currVal = toVisitQueue.shift();
      for (let neighbor of currVal.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return Array.from(seen).map(v => v.value);
  }
}

module.exports = {Graph, Node}