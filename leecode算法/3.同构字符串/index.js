// 给定两个字符串 s 和 t ，判断它们是否是同构的。

// 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

// 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

//  

// 示例 1:

// 输入：s = "egg", t = "add"
// 输出：true
// 示例 2：

// 输入：s = "foo", t = "bar"
// 输出：false
// 示例 3：

// 输入：s = "paper", t = "title"
// 输出：true
//  

// 提示：

// 1 <= s.length <= 5 * 104
// t.length == s.length
// s 和 t 由任意有效的 ASCII 字符组成


/* ------------------------------------我的解法----------------------------------------*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const s2t = {};
  const t2s = {};
  const len = s.length;
  for (let i = 0; i < len; i++) {
    if ((s2t[s[i]] && s2t[s[i]] !== t[i]) || (t2s[t[i]] && t2s[t[i]] !== s[i])) {
      return false;
    }
    s2t[s[i]] = t[i];
    t2s[t[i]] = s[i];
  }
  return true;
};

const flag = isIsomorphic('foo', 'bar');
console.log(flag);

/* ------------------------------------优秀解法----------------------------------------*/

// 方法：哈希表
// 思路：维护两张哈希表，分别建立对应关系，s-t,t-s,遍历，两边判断是否互相映射，已存在映射则返回false

var isIsomorphic = function (s, t) {
  const s2t = {};
  const t2s = {};
  const len = s.length;
  for (let i = 0; i < len; ++i) {
    const x = s[i],
      y = t[i];
    if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
      return false;
    }
    s2t[x] = y;
    t2s[y] = x;
  }
  return true;
};