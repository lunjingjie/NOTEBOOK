/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
//  从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
//  例如: 给定二叉树: [3,9,20,null,null,15,7],
// 输出：[3,9,20,15,7]

const levelOrder = function (root) {};

let tree = null;

const arr = [3,9,20,null,null,15,7];

class TreeRoot {
  constructor(node) {
    this.val = node;
    this.left = null;
    this.right = null;
  }
}

class TreeNode {
  constructor() {
    this.root = null;
  }

  insert(newNode1) {
    const newNode = new TreeRoot(newNode1);
    if (this.root) {
      this.insertNode(this.root, newNode);
    } else {
      this.root = newNode;
    }
  }

  insertNode(node, newNode) {
    if (node.val === newNode.left) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

const nodes = [3,9,20,null,null,15,7];
const tree1 = new TreeNode();
nodes.forEach(item => {
  tree1.insert(item);
});

console.log(tree1.root);