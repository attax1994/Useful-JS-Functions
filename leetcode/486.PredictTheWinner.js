/**
 * 给定一个表示分数的非负整数数组。
 * 玩家 1 从数组任意一端拿取一个分数，随后玩家 2 继续从剩余数组任意一端拿取分数，然后玩家 1 拿，…… 。
 * 每次一个玩家只能拿取一个分数，分数被拿取之后不再可取。
 * 直到没有剩余分数可取时游戏结束。最终获得分数总和最多的玩家获胜。
 *
 * 给定一个表示分数的数组，预测玩家1是否会成为赢家。你可以假设每个玩家的玩法都会使他的分数最大化。
 * @param {number[]} nums
 * @return {boolean}
 */
const PredictTheWinner = function (nums) {
  const len = nums.length

  // 初始化dp
  let dp = new Array(len)
  dp = dp.map(() => new Array(len))
  for (let i = 0; i < len; i++) {
    dp[i][i] = nums[i]
  }

  for (let i = len - 2; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      const pickI = nums[i] - dp[i + 1][j]
      const pickJ = nums[j] - dp[i][j - 1]
      dp[i][j] = Math.max(pickI, pickJ)
    }
  }

  return dp[0][len - 1] >= 0
}
