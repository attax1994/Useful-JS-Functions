/**
给出一个指定长度的数组，

|_|_|_|_|_|_|_|_|_|_|      例如：这个是长度为 10 的数组

再给定 数组的占用情况：例如 
[[1, 2], [4, 2]] (这个格式是确定的，数组的第一位为开始点的索引+1，第二位为占用长度)   
这个表示从0开始 占了2个， 从3开始 又占 2 个

|*|*|_|*|*|_|_|_|_|_| 

然后再给出一个将要占据的空间大小， 比如 3， 计算出 这个3可能占据的所有位置。

|*|*|_|*|*|_|#|#|#|_|  比如结果之一为  [6，7，8], 还可能为 [7, 8, 9]

结果必须是连续的。
*/

var len = 20
var used = [[1, 1], [4, 2], [6, 4], [10, 2], [16, 2]]
var use = 2

calcFreeSpace(len, used, use)
calcFreeSpace(len, [], use)

/*

|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|     20

 0                 1                   2
 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0

|*|_|_|*|*|*|*|*|*|*|*|_|_|_|_|*|*|_|_|_|

*/

function calcFreeSpace(len, used, use) {
    let empty = [],
        lastIndex = 1, lastLength = 0,
        currentIndex, currentLength,
        record,
        result = [];

    // 1. 寻找空位堆
    used.forEach((value) => {
        [currentIndex, currentLength] = value;
        if (currentIndex > lastIndex + lastLength) {
            empty.push([lastIndex + lastLength, currentIndex - lastIndex - lastLength]);
        }
        [lastIndex, lastLength] = [currentIndex, currentLength];
    });
    // 1.1 记得最后收尾
    if (len > lastIndex + lastLength - 1) {
        empty.push([lastIndex + lastLength, len + 1 - lastIndex - lastLength]);
    }

    // 2. 检查每个空位堆，选取长度合适的堆
    empty.forEach((value) => {
        [currentIndex, currentLength] = value;
        if (currentLength >= use) {
            // 每次向后移一位
            for (let i = 0; i <= currentLength - use; i++) {
                // 生成记录
                record = [];
                for (let j = 0; j < use; j++) {
                    record[j] = currentIndex + i + j;
                }
                result.push(record);
            }
        }
    });

    console.log(result);
}