class Graph<T> {
  // 顶点
  private vertex: T[] = []
  // 边: 邻接表
  private adjList: Map<T, T[]> = new Map()

  addVertex(vertex: T) {
    this.vertex.push(vertex)
    this.adjList.set(vertex, [])
  }
  addEdge(v1: T, v2: T) {
    if (!this.adjList.has(v1)) {
      this.addVertex(v1)
    }
    if (!this.adjList.has(v2)) {
      this.addVertex(v2)
    }
    this.adjList.get(v1)?.push(v2)
    this.adjList.get(v2)?.push(v1)
  }
  traverse() {
    this.vertex.forEach((vertex) => {
      const edges = this.adjList.get(vertex)
      console.log(`${vertex} -> ${edges?.join(' ')}`)
    })
  }

  // 遍历
  bfs() {
    if (!this.vertex.length) return
    const queue: T[] = []
    queue.push(this.vertex[0])

    const visited = new Set<T>()
    visited.add(this.vertex[0])

    while (queue.length) {
      const vertex = queue.shift()!
      console.log(vertex)
      const neighbors = this.adjList.get(vertex)
      if (!neighbors) continue
      for (let n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n)
          queue.push(n)
        }
      }
    }
  }
  dfs() {
    if (!this.vertex.length) return

    const stack: T[] = []
    stack.push(this.vertex[0])

    const visited = new Set<T>()
    visited.add(this.vertex[0])

    while (stack.length) {
      const vertex = stack.pop()!
      console.log(vertex)

      const neighbors = this.adjList.get(vertex)
      if (!neighbors) continue
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const n = neighbors[i]
        if (!visited.has(n)) {
          visited.add(n)
          stack.push(n)
        }
      }
    }
  }
}

const graph = new Graph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')
graph.addVertex('G')
graph.addVertex('H')
graph.addVertex('I')

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// graph.traverse()
// graph.bfs()
graph.dfs()
