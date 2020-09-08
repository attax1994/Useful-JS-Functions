/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  let temp = []
    , last
    , lastNum

  for (let i = 1; i <= n; i++) {
    temp.push([i])
  }

  const wfs = (queue, depth) => {
    if (depth >= k) return queue

    temp = []
    while (queue.length) {
      last = queue.pop()
      lastNum = last[depth - 1] || 0
      for (let i = lastNum + 1; i <= n - k + depth + 1; i++) {
        temp.push([...last, i])
      }
    }
    return wfs(temp, depth + 1)
  }

  return wfs(temp, 1)
}
