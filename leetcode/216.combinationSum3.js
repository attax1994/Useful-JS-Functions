/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
const combinationSum3 = function (k, n) {
  let current = []
    , res = []
  const limit = Math.min(n, 9)

  const dfs = (num, depth) => {
    const sum = current.reduce((acc, currentValue) => acc + currentValue, 0)

    if (sum + num > n || depth > k) return

    if (sum + num === n && depth === k) {
      current.push(num)
      res.push(current.slice())
      current.pop()
      return
    }

    num && current.push(num)
    for (let i = num + 1; i <= limit; i++) {
      dfs(i, depth + 1)
    }
    num && current.pop()
  }

  dfs(0, 0)

  return res
}
