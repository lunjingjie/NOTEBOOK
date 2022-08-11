// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表

// 方法1：递归
// 思路：递归停止条件：当head或者head的下一个元素为null时，核心：修改链表的元素指向，最后一个元素的指向修改为null

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};

// 方法2：迭代
// 思路：循环迭代修改指向

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while(curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};