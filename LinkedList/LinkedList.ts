import { Node } from './Node'
class LinkedList<T> {
  head: Node<T> | null = null
  private size: number = 0

  get length() {
    return this.size
  }

  private getNode(position: number): Node<T> | null {
    let index = 0
    let current = this.head
    while (index++ < position && current) {
      current = current.next
    }
    return current
  }

  append(val: T) {
    const node = new Node(val)

    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
  }
  // 遍历
  traverse() {
    const values: T[] = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }
    console.log(values.join(' -> '))
  }
  // 插入
  insert(value: T, position: number): boolean {
    if (position < 0 || position >= this.size) {
      return false
    }
    const node = new Node(value)
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      const previous = this.getNode(position - 1)

      // index === position
      node.next = previous?.next ?? null
      previous!.next = node
    }
    this.size++
    return true
  }
  // 删除
  removeAt(position: number): T | null {
    if (position < 0 || position >= this.size) {
      throw new Error('invalid position')
    }
    let current = this.head
    if (position === 0) {
      this.head = current?.next || null
    } else {
      const previous = this.getNode(position - 1)
      previous!.next = previous?.next?.next ?? null
    }
    this.size--

    return current?.value ?? null
  }

  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null
    return this.getNode(position)?.value ?? null
  }
}

const linkedList = new LinkedList<string>()
linkedList.append('a')
linkedList.append('b')
linkedList.append('c')
linkedList.append('d')

linkedList.traverse()
linkedList.insert('aa', 2)
linkedList.traverse()

const value = linkedList.removeAt(0)
linkedList.traverse()
// console.log('value', value)
// console.log(linkedList.get(1))
