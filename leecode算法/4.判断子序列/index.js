// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

// 进阶：

// 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

// 致谢：

// 特别感谢 @pbrother 添加此问题并且创建所有测试用例。

//  

// 示例 1：

// 输入：s = "abc", t = "ahbgdc"
// 输出：true
// 示例 2：

// 输入：s = "axc", t = "ahbgdc"
// 输出：false
//  

// 提示：

// 0 <= s.length <= 100
// 0 <= t.length <= 10^4
// 两个字符串都只由小写字符组成。

/* ------------------------------------我的解法----------------------------------------*/
// 未完成
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  const len = s.length;
  let index = 0;
  for (let i = 0; i < len; i++) {
    const occurIndex = t.indexOf(s[i]);
    if (occurIndex === -1) {
      return false;
    }
    if (occurIndex < index) {
      return false;
    }
    index = occurIndex;
  }
  return true;
};

console.log(isSubsequence('aaaaaa', 'bbaaaa'));


/* ------------------------------------优秀解法----------------------------------------*/

// 方法：双指针
// 思路：每匹配到一个字符相等，s字符串指针往右一位，t指针每次匹配时都遍历全部

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  const sLen = s.length;
  const tLen = t.length;
  let i = 0, j = 0;
  while (i < sLen && j < tLen) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }
  return i === sLen;
}

console.log(isSubsequence('aaaaaa', 'bbaaaa'));