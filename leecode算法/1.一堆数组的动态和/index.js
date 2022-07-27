// 给你一个数组 nums 。数组「动态和」的计算公式为：runningSum[i] = sum(nums[0]…nums[i]) 。

// 请返回 nums 的动态和。

//  

// 示例 1：

// 输入：nums = [1,2,3,4]
// 输出：[1,3,6,10]
// 解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。
// 示例 2：

// 输入：nums = [1,1,1,1,1]
// 输出：[1,2,3,4,5]
// 解释：动态和计算过程为 [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1] 。
// 示例 3：

// 输入：nums = [3,1,2,10,1]
// 输出：[3,4,6,16,17]
//  

// 提示：

// 1 <= nums.length <= 1000
// -10^6 <= nums[i] <= 10^6

/* ------------------------------------我的解法----------------------------------------*/
var getSum = function (nums, index) {
  let result = 0;
  for (let i = 0; i <= index; i += 1) {
    result += nums[i];
  }
  return result;
}

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  if (nums.length > 1000) {
    return;
  }
  const result = [];
  for (let i = 0; i < nums.length; i += 1) {
    const target = getSum(nums, i);
    result[i] = target;
  }
  return result;
};

var num = runningSum([1, 2, 3, 4, 5]);
console.log(num);

/* ------------------------------------优秀解法----------------------------------------*/

// 方法：原地修改
// 思路：修改原数组，从下标为1的元素开始，当前值+上一个元素的值即可

var runningSum = function (nums) {
  for (let i = 1; i < nums.length; i += 1) {
    nums[i] = nums[i - 1] + nums[i];
  }
  return nums;
};

var num = runningSum([1, 2, 3, 4, 5]);
console.log(num);

