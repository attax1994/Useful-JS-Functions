/** https://leetcode-cn.com/problems/recursive-mulitply-lcci/
 * @param {number} A
 * @param {number} B
 * @param {number} temp
 * @return {number}
 */
var multiply = function (A, B, temp = 0) {
  if (A > B) return multiply(B, A)
  if (A === 0) return temp
  return multiply(--A, B, temp + B)
}
