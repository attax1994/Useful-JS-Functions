/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  function factorial(n) {
    let result = n
    if (n === 1 || n === 0) {
      return 1
    } else {
      while (n >= 2) {
        result = result * (n - 1)
        n--
      }
      return result
    }
  }

  return factorial(m + n - 2) / (factorial(m - 1) * factorial(n - 1))
}
