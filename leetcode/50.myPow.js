/**
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
  if (!n) return 1
  if (n < 0) return 1 / myPow(x, -n)

  if (n % 2) {
    return x * myPow(x, n - 1)
  } else {
    return myPow(x * x, n / 2)
  }
}
