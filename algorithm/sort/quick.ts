/**
 * 快速排序
 * 性能：时间 O(nlogn)，空间 O(1)
 * 原理：在每一趟排序的过程中，设置一个基准值（pivot），
 * 将每个区块内的元素与之比对，小于pivot的元素向前迁移，
 * 同时用index记录pivot在比对完成后，应当插入的位置，插入后pivot处于正确的位置。
 * 然后从这个位置开始，分割数组，分别排序。
 */
function quickSort(arr: number[], left: number = 0, right: number = arr.length - 1) {
    let partitionIndex

    if (left < right) {
        partitionIndex = partition(arr, left, right)
        // 分割为比pivot小和比pivot大的两个数组，分别排序（二分法）
        quickSort(arr, left, partitionIndex - 1)
        quickSort(arr, partitionIndex + 1, right)
    }

    return arr
}


// 分区操作
function partition(arr: number[], left: number, right: number) {
    // 以最左侧的元素为基准值（pivot）
    let pivot = left
        , index = pivot + 1

    for (var i = index; i <= right; i++) {
        // 小于基准值的数字放入左侧，用index记录pivot插入位置
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index)
            index++
        }
    }

    const partitionIndex = index - 1
    // 将pivot插入对应位置，从而进行下一轮的排序
    swap(arr, pivot, partitionIndex)
    return partitionIndex
}


function swap(arr: number[], i: number, j: number) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}