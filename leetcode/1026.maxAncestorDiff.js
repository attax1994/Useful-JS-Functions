/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxAncestorDiff = function (root) {
  function getDiff(a, b) {
    return Math.abs(a - b)
  }

  if (!root) return 0

  let result = 0

  const dfs = (node) => {
    if (node.left && node.left.val != null) {
      const val = node.left.val
      node.left.max = node.max
      node.left.min = node.min
      if (val > node.max) {
        result = Math.max(result, getDiff(node.min, val))
        node.left.max = val
      } else if (val < node.min) {
        result = Math.max(result, getDiff(node.max, val))
        node.left.min = val
      }
      dfs(node.left)
    }
    if (node.right && node.right.val != null) {
      const val = node.right.val
      node.right.max = node.max
      node.right.min = node.min
      if (val > node.max) {
        result = Math.max(result, getDiff(node.min, val))
        node.right.max = val
      }
      if (val < node.min) {
        result = Math.max(result, getDiff(node.max, val))
        node.right.min = val
      }
      dfs(node.right)
    }
  }

  root.max = root.min = root.val
  dfs(root)

  return result
}

