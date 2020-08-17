/**
 * 1. 特判，对于数组长度 n，如果数组为 null 或者数组长度小于 3，返回 []。
 * 2.对数组进行排序。
 * 3. 遍历排序后数组：
 若 nums[i]>0nums[i]>0：因为已经排序好，所以后面不可能有三个数加和等于 0，直接返回结果。
 对于重复元素：跳过，避免出现重复解
 令左指针 L=i+1，右指针 R=n-1，当 L<R 时，执行循环：
 当 nums[i]+nums[L]+nums[R]==0，执行循环，判断左界和右界是否和下一位置重复，去除重复解。并同时将 L,R 移到下一位置，寻找新的解
 若和大于 0，说明 nums[R] 太大，R 左移
 若和小于 0，说明 nums[L] 太小，L 右移
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return []
  nums = nums.sort((a, b) => a - b)

  let res = []
    , len = nums.length
    , L
    , R

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return res
    if (i && nums[i] === nums[i - 1]) continue

    L = i + 1
    R = len - 1

    while (L < R) {
      let temp = nums[i] + nums[L] + nums[R]
      if (temp > 0) {
        --R
      } else if (temp < 0) {
        ++L
      } else {
        res.push([nums[i], nums[L], nums[R]])
        while (nums[L] === nums[L + 1]) {
          ++L
        }
        while (nums[R] === nums[R - 1]) {
          --R
        }
        ++L
        --R
      }
    }
  }
  return res
}
