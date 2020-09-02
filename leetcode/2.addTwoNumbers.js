/**
 *
 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  function ListNode(val) {
    this.val = val
    this.next = null
  }

  let ascend = false
    , leftNode = l1
    , rightNode = l2
    , res = new ListNode()
    , currentNode = res
    , temp
  while (leftNode || rightNode) {
    temp =
      (leftNode ? leftNode.val : 0)
      + (rightNode ? rightNode.val : 0)
      + (ascend ? 1 : 0)
    ascend = temp > 9
    currentNode = currentNode.next = new ListNode(temp % 10)
    leftNode = leftNode && leftNode.next
    rightNode = rightNode && rightNode.next
  }

  if (ascend) currentNode.next = new ListNode(1)

  return res.next
}
