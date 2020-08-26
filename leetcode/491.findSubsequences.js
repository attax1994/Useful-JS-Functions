/**
 * 给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。
 * @param {number[]} nums
 * @return {number[][]}
 */
const findSubsequences = function (nums) {
  const len = nums.length
  const set = new Set()

  const dfs = (start, path) => {
    if (path.length > 1) {
      const str = path.join(',')
      set.add(str)
    }

    for (let i = start; i < len; i++) {
      const prev = path[path.length - 1]
      const cur = nums[i]
      if (path.length === 0 || prev <= cur) {
        path.push(cur)    // 选择当前的数字
        dfs(i + 1, path)  // 继续往下递归
        path.pop()        // 撤销选择当前数字，选择别的数字
      }
    }
  }

  dfs(0, [])
  return [...set].map((str) => str.split(','))
}
