// 给定一个头结点为 head 的非空单链表，返回链表的中间结点。

// 如果有两个中间结点，则返回第二个中间结点。

//  

// 示例 1：

// 输入：[1,2,3,4,5]
// 输出：此列表中的结点 3 (序列化形式：[3,4,5])
// 返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
// 注意，我们返回了一个 ListNode 类型的对象 ans，这样：
// ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
// 示例 2：

// 输入：[1,2,3,4,5,6]
// 输出：此列表中的结点 4 (序列化形式：[4,5,6])
// 由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
//  

// 提示：

// 给定链表的结点数介于 1 和 100 之间。

// 方法1：数组
// 思路：遍历链表中每个元素，存到数组中，最后求数组的中心下标，返回元素

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var middleNode = function(head) {
  let A = [head];
  while (A[A.length - 1].next !== null) {
    A.push(A[A.length - 1].next);
  }
  return A[Math.trunc(A.length / 2)];
};

// 方法2：单指针法
// 思路：与数组类似，但舍弃数组，遍历链表，记录长度n，然后遍历取第n / 2个node

var middleNode = function(head) {
  let n = 0;
  let curr = head.next;
  while (curr !== null) {
    n++;
    curr = curr.next;
  }
  let i = 0;
  curr = head;
  while (i === Math.trunc(n / 2)) {
    i++;
    curr = curr.next;
  }
  return curr;
};

// 方法3：快慢指针法
// 思路：用两个指针 slow 与 fast 一起遍历链表。slow 一次走一步，fast 一次走两步。那么当 fast 到达链表的末尾时，slow 必然位于中间

var middleNode = function(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    // 一次走一步
    slow = slow.next;
    // 一次走两步
    fast = fast.next.next;
  }
  return slow;
};