// 给你一个整数数组 nums ，请计算数组的 中心下标 。

// 数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。

// 如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

// 如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

//  

// 示例 1：

// 输入：nums = [1, 7, 3, 6, 5, 6]
// 输出：3
// 解释：
// 中心下标是 3 。
// 左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
// 右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。
// 示例 2：

// 输入：nums = [1, 2, 3]
// 输出：-1
// 解释：
// 数组中不存在满足此条件的中心下标。
// 示例 3：

// 输入：nums = [2, 1, -1]
// 输出：0
// 解释：
// 中心下标是 0 。
// 左侧数之和 sum = 0 ，（下标 0 左侧不存在元素），
// 右侧数之和 sum = nums[1] + nums[2] = 1 + -1 = 0 。

/* ------------------------------------我的解法----------------------------------------*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const length = nums.length;
  const total = sumTotal(nums, length - 1);
  let result = -1;
  for (let i = 0; i < length; i += 1) {
    if (i === 0) {
      if (nums[0] === total) {
        result = 0;
        break;
      }
    } else {
      if (add(sumTotal(nums, i - 1), nums[i], total)) {
        result = i;
        break;
      } else {
        result = -1;
      }
    }
  }
  return result;
};

var sumTotal = function (nums, index) {
  let result = 0;
  for (let i = 0; i <= index; i += 1) {
    result += nums[i];
  }
  return result;
}

var add = function (left, current, total) {
  return left * 2 + current === total;
}

/* ------------------------------------优秀解法----------------------------------------*/

// 方法：前缀和
// 思路：核心算法（遍历到当前元素，左侧元素之和 * 2 + 当前元素 === 数组总和），记录每次遍历的左侧元素之和
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let sum = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (sum * 2 + nums[i] === total) {
      return i;
    }
    sum += nums[i];
  }
  return -1;
};

const result = pivotIndex([1, 7, 3, 6, 5, 6]);
console.log(result);