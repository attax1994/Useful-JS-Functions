/**
 *
 给定两个大小相等的数组 A 和 B，A 相对于 B 的优势可以用满足 A[i] > B[i] 的索引 i 的数目来描述。
 返回 A 的任意排列，使其相对于 B 的优势最大化。（田忌赛马、贪心算法）

 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var advantageCount = function (A, B) {
  A = A.sort((a, b) => a - b)
  let assigned = []
  let currentB
    , tempA

  while (B.length) {
    currentB = B.shift()
    tempA = null

    const ALen = A.length
    for (let i = 0; i < ALen; i++) {
      if (A[i] > currentB) {
        tempA = A.splice(i, 1)[0]
        break
      }
    }

    if (tempA == null) tempA = A.shift()

    assigned.push(tempA)
  }

  return assigned
}

advantageCount([2, 7, 11, 15], [1, 10, 4, 11])
