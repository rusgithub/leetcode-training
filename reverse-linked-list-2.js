/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  let start = null;
  let end = null;

  function dfs(node, prev) {
      if (start === null && node.val === left - 1) {
          start = node;
      }
      if (end === null && node.val === right + 1) {
          end = node;
      }

      if (node.next !== null) {
          dfs(node.next, node);
      }

      if (node.val <= right && node.val >= left) {
          node.next = prev;
          if (node.val === right) {
              start.next = node;
          }
          if (node.val === left) {
              node.next = end;
          }
      }
  }

  dfs(head, null);

  return head;
};

function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
}

const node = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))));

reverseBetween(node, 2, 4);