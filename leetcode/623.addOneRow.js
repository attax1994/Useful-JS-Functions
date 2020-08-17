/**
 *
 * 给定一个二叉树，根节点为第1层，深度为 1。在其第 d 层追加一行值为 v 的节点。

 添加规则：给定一个深度值 d （正整数），针对深度为 d-1 层的每一非空节点 N，为 N 创建两个值为 v 的左子树和右子树。

 将 N 原先的左子树，连接为新节点 v 的左子树；将 N 原先的右子树，连接为新节点 v 的右子树。

 如果 d 的值为 1，深度 d - 1 不存在，则创建一个新的根节点 v，原先的整棵树将作为 v 的左子树。
 */
/**
 * 深度优先遍历
 * @param {TreeNode} root
 * @param {number} v
 * @param {number} d
 * @return {TreeNode}
 */
var addOneRow = function (root, v, d) {
  class TreeNode {
    constructor(val) {
      this.val = val
      this.left = this.right = null
    }
  }

  if (d === 1) {
    let newRoot = new TreeNode(v)
    newRoot.left = root
    return newRoot
  }

  let queue = [root]
  let temp
  let depth = 1
  while (depth < d - 1) {
    temp = []
    while (queue.length) {
      const {left, right} = queue.shift()
      if (left != null) temp.push(left)
      if (right != null) temp.push(right)
    }
    queue = temp
    depth++
  }

  // 基于改造d-1层的所有节点
  while (queue.length) {
    const current = queue.shift()

    const newLeft = new TreeNode(v)
    newLeft.left = current.left
    current.left = newLeft

    const newRight = new TreeNode(v)
    newRight.right = current.right
    current.right = newRight
  }

  return root
}
