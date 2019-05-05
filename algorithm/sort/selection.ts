; (function (global: Window) {
  function selectionSort(arr: number[]) {
    for (let i = 0, len = arr.length; i < len; i++) {
      let min = i
      // 每一趟从后面的无序区选取最小的数挪到当前索引下
      for (let j = i + 1; j < len; j++) {
        if (less(arr[j], arr[min])) { min = j }
      }
      swap(arr, i, min)
    }
    return arr
  }

  function less(left: number, right: number): boolean {
    return left < right
  }

  function swap(arr: number[], leftIndex: number, rightIndex: number) {
    let temp: number = arr[leftIndex]
    arr[leftIndex] = arr[rightIndex]
    arr[rightIndex] = temp
  }

  (global as any).selectionSort = selectionSort
}(window));