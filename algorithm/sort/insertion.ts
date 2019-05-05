; (function (global: Window) {
  function InsertionSort(arr: number[]) {
    for (let i = 0, len = arr.length; i < len; i++) {
      // 取出第i个元素，逐个与前面的元素对比，选择数值不大于它的位置插入
      for (let j = i; j > 0 && less(arr[j], arr[j - 1]); j--) {
        swap(arr, j, j - 1)
      }
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

  (window as any).InsertionSort = InsertionSort
}(window));
