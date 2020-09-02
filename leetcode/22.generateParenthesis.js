/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  let res = []
  if (!n) return res

  const targetLen = n * 2
  let nextLeft
    , nextRight

  const dfs = (left, right, str) => {
    // 合法结果
    if (str.length === targetLen && left === right) return res.push(str)

    nextLeft = left + 1
    if (nextLeft > right && nextLeft <= n) {
      dfs(nextLeft, right, str + '(')
    }

    nextRight = right + 1
    if (left >= nextRight && nextRight <= n) {
      dfs(left, nextRight, str + ')')
    }
  }

  dfs(0, 0, '')

  return res
}
