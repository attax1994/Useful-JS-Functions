/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = {next: head}

  let len = 0
  let temp = dummy

  while (temp.next) {
    temp = temp.next
    ++len
  }

  len -= n
  temp = dummy
  while (len) {
    temp = temp.next
    --len
  }

  temp.next = temp.next.next
  return dummy.next
}
