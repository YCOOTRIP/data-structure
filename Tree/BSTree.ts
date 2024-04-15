import { btPrint } from 'hy-algokit'
class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  parent: TreeNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
  get isLeft() {
    return !!(this.parent && this.parent.left === this)
  }
  get isRight() {
    return !!(this.parent && this.parent.right === this)
  }
}
// 二叉搜索树 左小右大
class BSTree<T> {
  private root: TreeNode<T> | null = null

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  private searchNode(val: T): TreeNode<T> | null {
    let current = this.root
    let parent: TreeNode<T> | null = null
    while (current) {
      if (current.value === val) return current
      parent = current
      if (val < current.value) {
        current = current.left
      } else {
        current = current.right
      }
      if (current) current.parent = parent
    }
    return null
  }

  private getSuccessor(delNode: TreeNode<T>): TreeNode<T> {
    let current = delNode.right
    let successor: TreeNode<T> | null = null
    while (current) {
      successor = current
      current = current.left
      if (current) {
        current.parent = successor
      }
    }
    return successor!
  }

  print() {
    btPrint(this.root)
  }

  insert(val: T) {
    const newNode = new TreeNode<T>(val)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  // 遍历
  preOrderTraverse() {
    // 先序遍历
    this.preOrderTraverseNode(this.root)
  }
  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value)
      this.preOrderTraverseNode(node.left)
      this.preOrderTraverseNode(node.right)
    }
  }

  inOrderTraverse() {
    // 中序遍历
    this.inOrderTraverseNode(this.root)
  }
  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left)
      console.log(node.value)
      this.inOrderTraverseNode(node.right)
    }
  }
  postOrderTraverse() {
    // 后序遍历
    this.postOrderTraverseNode(this.root)
  }
  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left)
      this.postOrderTraverseNode(node.right)
      console.log(node.value)
    }
  }

  levelOrderTraverse() {
    // 层序遍历
    if (!this.root) return
    const queue: TreeNode<T>[] = []
    queue.push(this.root)
    while (queue.length) {
      const node = queue.shift()!
      console.log(node.value)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }

  getMaxValue(): T | null {
    if (!this.root) return null
    let current = this.root.right
    while (current?.right) {
      current = current.right
    }
    return current?.value ?? null
  }
  getMinValue(): T | null {
    if (!this.root) return null
    let current = this.root.left
    while (current?.left) {
      current = current.left
    }
    return current?.value ?? null
  }

  //搜索-递归写法
  search(value: T, root: TreeNode<T> | null = this.root): boolean {
    if (!root) return false
    if (value === root.value) return true
    if (value < root.value) {
      return this.search(value, root?.left)
    } else {
      return this.search(value, root?.right)
    }
  }

  // 搜索-非递归写法
  has(val: T): boolean {
    return !!this.searchNode(val)
  }

  // 删除节点
  remove(value: T): boolean {
    const current = this.searchNode(value)
    if (!current) return false
    // console.log('current', current?.value, 'parent', current?.parent?.value)
    // 1.叶子节点
    if (!current.left && !current.right) {
      if (current.isLeft) {
        current.parent!.left = null
      } else if (current.isRight) {
        current.parent!.right = null
      } else {
        this.root = null
      }
    }
    // 2.只有一个子节点
    else if (!current.right) {
      if (current.isLeft) {
        current.parent!.left = current.left
      } else if (current.isRight) {
        current.parent!.right = current.left
      } else {
        this.root = current.left
      }
    } else if (!current.left) {
      if (current.isLeft) {
        current.parent!.left = current.right
      } else if (current.isRight) {
        current.parent!.right = current.right
      } else {
        this.root = current.right
      }
    }
    // 3.有两个子节点(寻找前驱或者后继节点 前驱:左子树最大值  后继:右子树最小值)
    else {
      const successor = this.getSuccessor(current)
      if (current.isLeft) {
        current.parent!.left = successor
      } else if (current.isRight) {
        current.parent!.right = successor
      } else {
        this.root = successor
      }
      // 将删除节点的left赋值为后继节点的left
      successor.left = current.left

      if (successor !== current.right) {
        // 最特殊的情况: 后继节点有右子树
        successor!.parent!.left = successor!.right
        // (必须要的操作) 将删除节点的right赋值为后继节点的right
        successor.right = current.right
      }
    }
    return true
  }
}

const bst = new BSTree<number>()
bst.insert(20)
bst.insert(30)
bst.insert(18)
bst.insert(78)
bst.insert(28)
bst.insert(11)
bst.insert(19)

bst.print()
// bst.preOrderTraverse()
// bst.inOrderTraverse()
// bst.postOrderTraverse()
// bst.levelOrderTraverse()
// console.log(bst.getMaxValue(), bst.getMinValue())

// console.log(bst.search(119))
// console.log(bst.has(190))

// 删除叶子节点测试
// bst.remove(11)
// bst.print()

// bst.remove(19)
// bst.print()

// 删除左节点测试
// bst.remove(78)
// bst.print()

// bst.remove(30)
// bst.print()

// 删除右节点测试
// bst.remove(28)
// bst.print()

// bst.remove(30)
// bst.print()

// 删除中间节点测试

// bst.remove(30)
// bst.print()

// 删除节点右子节点非叶子节点(!特殊逻辑) 测试
// bst.insert(32)
// bst.print()
// bst.remove(30)
// bst.print()

// 后继节点有右子树 测试
bst.insert(32)
bst.insert(33)
bst.print()
bst.remove(30)
bst.print()

// bst.insert(80)
// bst.print()
// bst.remove(30)
// bst.print()

// 删除节点左子节点非叶子节点(已考虑) 测试
// bst.insert(27)
// bst.print()
// bst.remove(30)
// bst.print()

// bst.insert(29)
// bst.print()
// bst.remove(30)
// bst.print()
