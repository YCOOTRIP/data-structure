class HashTable<T = any> {
  storage: [string, T][][] = []
  // 数组长度
  private length: number = 7
  // 已存放元素个数
  private count: number = 0

  private isPrime(num: number): boolean {
    const sqrt = Math.sqrt(num)
    for (let i = 2; i <= sqrt; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  private hashFunc(key: string, max: number): number {
    let hashCode = 0
    const len = key.length
    for (let i = 0; i < len; i++) {
      // 依据霍纳法则计算hash值
      hashCode = 37 * hashCode + key.charCodeAt(i)
    }
    return hashCode % max
  }
  private resize(newLength: number) {
    // 1.设置新长度

    // 2.判断是否是质数
    let newPrime = newLength
    while (!this.isPrime(newPrime)) {
      newPrime++
    }
    if (newPrime < 7) newPrime = 7
    console.log('获取到容量的质数', newPrime)

    this.length = newPrime

    this.count = 0
    // 获取原先数据, 放入新的数组中
    const oldStorage = this.storage
    this.storage = []
    oldStorage.forEach((bucket) => {
      if (!bucket) return
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i]
        this.put(tuple[0], tuple[1])
      }
    })
  }

  // 插入/修改
  put(key: string, value: T) {
    const position = this.hashFunc(key, this.length)
    let bucket = this.storage[position]
    if (!bucket) {
      bucket = []
      this.storage[position] = bucket
    }
    let isUpdate = false
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value
        isUpdate = true
        break
      }
    }
    if (!isUpdate) {
      bucket.push([key, value])
      this.count++
      // 若loadFactor > 0.75 , 则需要扩容
      if (this.count / this.length > 0.75) {
        this.resize(this.length * 2)
      }
    }
  }

  // 获取
  get(key: string): T | undefined {
    const position = this.hashFunc(key, this.length)
    const bucket = this.storage[position]
    if (!bucket) return undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1]
      }
    }
    return undefined
  }

  remove(key: string): T | undefined {
    const position = this.hashFunc(key, this.length)
    const bucket = this.storage[position]
    if (!bucket) return undefined
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        const result = bucket[i][1]
        bucket.splice(i, 1)
        this.count--
        // 缩容
        if (this.count / this.length < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2))
        }

        return result
      }
    }
    return undefined
  }
}

const hashTable = new HashTable()
// 模拟存储员工信息 (姓名, 工号 (T: 任意的员工信息))
// 存放
// hashTable.put('yc', 1)
// hashTable.put('ec', 2)
// console.log(hashTable.storage)

// 获取
// console.log(hashTable.get('yc'))
// console.log(hashTable.get('ec'))

// 替换
// hashTable.put('yc', 1)
// hashTable.put('yc', 100)

// 扩容
// hashTable.put('yc', 1)
// hashTable.put('ec', 2)
// hashTable.put('tc', 3)
// hashTable.put('aaa', 4)
// hashTable.put('bbb', 5)
// hashTable.put('ccc', 6)
// hashTable.put('ddd', 7)
// // 长度是<=14的数组 是因为index===13(最后一个位置)的位置上面没有放bucket
// console.log(hashTable.storage)

// 缩容
hashTable.put('yc', 1)
hashTable.put('ec', 2)
hashTable.put('tc', 3)
hashTable.put('aaa', 4)
hashTable.put('bbb', 5)
hashTable.put('ccc', 6)
hashTable.put('ddd', 7)
console.log(hashTable.storage)
hashTable.remove('ccc')
hashTable.remove('ddd')
hashTable.remove('ec')
hashTable.remove('tc')
hashTable.remove('aaa')
console.log(hashTable.storage)
