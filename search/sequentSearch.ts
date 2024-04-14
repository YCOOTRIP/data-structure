function sequentSearch<T>(list: T[], value: T): number {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === value) {
      return i
    }
  }
  return -1
}
