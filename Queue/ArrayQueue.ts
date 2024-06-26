import IQueue from './IQueue'
class ArrayQueue<T> implements IQueue<T> {
  private data: T[] = []

  enqueue(ele: T): void {
    this.data.push(ele)
  }

  dequeue(): T | undefined {
    return this.data.shift()
  }

  peek(): T | undefined {
    return this.data[0]
  }

  isEmpty(): boolean {
    return this.data.length === 0
  }

  size(): number {
    return this.data.length
  }
}
