/**
 * 给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。
 * 注意:
 * num 的长度小于 10002 且 ≥ k。
 * num 不会包含任何前导零。
 *
 * 思路：单调栈
 *
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
const removeKDigits = function (num, k) {
  let stack = []

  for (let i = 0, len = num.length; i < len; i++) {
    let temp = num[i]
    //当遍历的元素比此时栈顶元素小，删除栈顶元素
    while (k && stack.length && temp < stack[stack.length - 1]) {
      stack.pop()
      k--
    }
    stack.push(temp)
  }

  // 如果未删除，从尾部继续
  while (k) {
    stack.pop()
    k--
  }

  return stack.join('').replace(/^[0]+/, '') || '0'
}
