// 采用自上而下的递归方法
function mergeSort(arr: Array<number>) {
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left: Array<number>, right: Array<number>) {
    var result = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    // 把未写入的大数继续写入
    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}