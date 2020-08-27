/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
 * 注意：你不能在买入股票前卖出股票。
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
  let max = 0
    , minPrice = prices[0]
    , len = prices.length
    , current
  for (let i = 1; i < len; i++) {
    current = prices[i]
    minPrice = Math.min(minPrice, current)
    max = Math.max(max, current - minPrice)
  }

  return max
}
