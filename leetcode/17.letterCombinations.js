/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) return []
  const res = []
  const len = digits.length

  const map = new Map()
  map.set('2', 'abc')
  map.set('3', 'def')
  map.set('4', 'ghi')
  map.set('5', 'jkl')
  map.set('6', 'mno')
  map.set('7', 'pqrs')
  map.set('8', 'tuv')
  map.set('9', 'wxyz')

  const dfs = (index, curStr) => {
    if (index >= len) {
      res.push(curStr)
      return
    }

    const chars = map.get(digits.charAt(index))
    for (let i = 0, charLen = chars.length; i < charLen; i++) {
      dfs(index + 1, curStr + chars.charAt(i))
    }
  }

  dfs(0, '')

  return res
}
