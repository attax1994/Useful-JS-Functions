/**
 *
 * 给定一个机票的字符串二维数组 [from, to]，子数组中的两个成员分别表示飞机出发和降落的机场地点，对该行程进行重新规划排序。
 * 所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。
 * 说明:
 * 如果存在多种有效的行程，你可以按字符自然排序返回最小的行程组合。例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
 * 所有的机场都用三个大写字母表示（机场代码）。
 * 假定所有机票至少存在一种合理的行程。
 * @param {string[][]} tickets
 * @return {string[]}
 */
const findItinerary = function (tickets) {
  const map = Object.create(null)
    , len = tickets.length
    , res = ['JFK']
  for (let ticket of tickets) {
    const [from, to] = ticket
    const toCities = map[from] || []
    toCities.push(to)
    map[from] = toCities
  }

  Object
    .keys(map)
    .forEach((city) => {
      map[city].sort()
    })

  const dfs = (city, used) => {
    if (used === len) return true
    const nextCities = map[city] || []
    if (!nextCities.length) return false

    for (let i = 0, cityCount = nextCities.length; i < cityCount; i++) {
      const city = nextCities.splice(i, 1)[0]
      res.push(city)

      if (dfs(city, used + 1)) {
        return true
      } else {
        nextCities.splice(i, 0, res.pop())
      }
    }
  }

  dfs('JFK', 0)
  return res
}
