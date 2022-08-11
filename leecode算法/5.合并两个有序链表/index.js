// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

//  

// 示例 1：


// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
// 示例 2：

// 输入：l1 = [], l2 = []
// 输出：[]
// 示例 3：

// 输入：l1 = [], l2 = [0]
// 输出：[0]
//  

// 提示：

// 两个链表的节点数目范围是 [0, 50]
// -100 <= Node.val <= 100
// l1 和 l2 均按 非递减顺序 排列



// function ListNode(val, next) {
//   this.val = (val === undefined ? 0 : val)
//   this.next = (next === undefined ? null : next)
// }

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) {
    return list2;
  }
  if (list2 === null) {
    return list1;
  }
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  }
  list2.next = mergeTwoLists(list2.next, list1);
};

// 复杂度分析

// 如何计算递归的时间复杂度和空间复杂度呢？ 力扣对此进行了 详细介绍 ，其中时间复杂度可以这样计算：

// 给出一个递归算法，其时间复杂度 {\mathcal{O}(T)}O(T) 通常是递归调用的数量（记作 {R}R） 和计算的时间复杂度的乘积（表示为 {\mathcal{O}(s)}O(s)）的乘积：{\mathcal{O}(T) = R * \mathcal{O}(s)}O(T)=R∗O(s)

// 时间复杂度：{\mathcal{O}}(m + n)O(m+n)。

// mm，nn 为 l_{1}l 
// 1
// ​
//   和 l_{2}l 
// 2
// ​
//   的元素个数。递归函数每次去掉一个元素，直到两个链表都为空，因此需要调用 R=O(m + n)R=O(m+n) 次。而在递归函数中我们只进行了 next 指针的赋值操作，复杂度为 \mathcal{O}(1)O(1)，故递归的总时间复杂度为 {\mathcal{O}(T) = R * \mathcal{O}(1)}={\mathcal{O}}(m + n)O(T)=R∗O(1)=O(m+n) 。

// 空间复杂度：{\mathcal{O}}(m + n)O(m+n)。**

// 对于递归调用 self.mergeTwoLists()，当它遇到终止条件准备回溯时，已经递归调用了 m+nm+n 次，使用了 m+nm+n 个栈帧，故最后的空间复杂度为 {\mathcal{O}}(m + n)O(m+n)。