import IList from '../types/IList'

interface IStack<T> extends IList<T> {
  push(ele: T): void
  pop(): T | undefined
  // peek(): T | undefined
  // isEmpty(): boolean
  // size(): number
}
export default IStack
