// 判断质数

// export default function isPrime(num: number) {
//   for (let i = 2; i < num; i++) {
//     if (num % i === 0) {
//       return false
//     }
//   }
//   return true
// }

// 优化 O(n) => O(logn)
export default function isPrime(num: number) {
  const sqrt = Math.sqrt(num)
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}

console.log(isPrime(5)) // true
console.log(isPrime(6)) // false
console.log(isPrime(7)) // true
console.log(isPrime(21)) // false
console.log(isPrime(89)) // true
console.log(isPrime(197)) // true
