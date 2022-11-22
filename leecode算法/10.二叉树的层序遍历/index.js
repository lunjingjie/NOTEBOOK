// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
  const ret = [];
  if (!root) {
      return [];
  }

  const q = [];
  q.push(root);
  while (q.length !== 0) {
      const size = q.length;
      ret.push([]);
      for (let i = 1; i <= size; ++i) {
          const node = q.shift();
          ret[ret.length - 1].push(node.val);
          if (node.left) q.push(node.left);
          if (node.right) q.push(node.right);
      }
  }
  return ret;
};

/** 
 * 思路：
 * 1.非空判断
 * 2.不断把节点放到q，通过while判断q不为空进行遍历
 * 3.通过i控制同一层的节点放在同一个数组（ret.push([])）,把子节点放到q数组作为下一层的遍历的父节点
 */