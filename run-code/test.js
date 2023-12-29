// function getTargetUrl(url, param, value) {
//   if (url.indexOf('?') === -1) {
//     if (param && value !== undefined) {
//       return `${url}?${param}=${value}`;
//     }
//     return url;
//   }
//   const baseUrl = url.split('?')[0];
//   const paramsArr = url.split('?')[1].split('&');
//   const resultParams = [];
//   let flag = false;
//   paramsArr.forEach(paramStr => {
//     if (paramStr.split('=')[0] === param) {
//       paramStr = `${param}=${value}`;
//       resultParams.push(paramStr);
//       flag = true;
//     } else {
//       resultParams.push(paramStr);
//     }
//   });
//   if (!flag) {
//     resultParams.push(`${param}=${value}`);
//   }
//   return `${baseUrl}?${resultParams.join('&')}`;
// }

// const str = getTargetUrl('http://www.abc.com?c=1&param=3&d=4', 'param', 5);
// console.log(str);

const arr = [
  // 服务 A => B, 耗时 100ms
  ['A', 'B', 100],
  ['A', 'C', 50],
  ['A', 'F', 200],
  ['B', 'G', 300],
  ['C', 'F', 100],
  ['F', 'G', 300]
]

const pathMap = getArrToMap(arr);
console.log(pathMap);
const resultMap = new Map();
let path = [];
let maxTime = 0;

function getLongest(arr) {
  arr.forEach(item => {
    maxTime += item[2];
    path.push(item[0], item[1]);
    findPath(item);
    resultMap.set(path, maxTime);
    path = [];
    maxTime = 0;
  });
}

function findPath(target) {
  const [start, end, time] = target;
  Object.keys(pathMap).forEach(key => {
    if (key.startsWith(end)) {
      maxTime += pathMap[key][2];
      path.push(pathMap[key][0], pathMap[key][1]);
      findPath(pathMap[key]);
    }
  });
  // maxTime += time;
  // path.push(start, end);
}

function getArrToMap(arr) {
  const obj = new Object();
  arr.forEach(item => {
    obj[`${item[0]}${item[1]}`] = item;
  });
  return obj;
}

getLongest(arr) // 输出结果: A-F-G
console.log(resultMap);


const commodity = new Map([
  ['phone', 1999],
  ['computer', 9999],
  ['television', 2999],
  ['gameBoy', 3999],
])

const price = (name) => {
  return commodity.get(name)
}
console.log(price('phone')); // 1999

function findPalindromeNumbers3(max) {
  const res = []
  if (max <= 0) return res

  for (let i = 1; i <= max; i++) {
      let n = i
      let rev = 0 // 存储翻转数

      // 生成翻转数
      while (n > 0) {
          rev = rev * 10 + n % 10
          n = Math.floor(n / 10)
      }

      if (i === rev) res.push(i)
  }

  return res
}

console.log(findPalindromeNumbers3(10000000));