// 二分查找 O(logn) list必须是有序的(从小到大)
function binarySearch<number>(list: number[], value: number): number {
  let left = 0
  let right = list.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (value > list[mid]) {
      left = mid + 1
    } else if (value < list[mid]) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

const arr = [1, 2, 3, 4, 5]
console.log(binarySearch(arr, 2))
