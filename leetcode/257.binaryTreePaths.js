/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 *     this.path = '';
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
const binaryTreePaths = function (root) {
  if(!root) return []

  let result = []

  const dfs = (node) => {
    let hasChildNode = false
    if (node.left) {
      hasChildNode = true
      node.left.path = `${node.path}->${node.left.val}`
      dfs(node.left)
    }
    if (node.right) {
      hasChildNode = true
      node.right.path = `${node.path}->${node.right.val}`
      dfs(node.right)
    }
    if (!hasChildNode) result.push(node.path)
  }

  root.path = `${root.val}`
  dfs(root)

  return result
}
