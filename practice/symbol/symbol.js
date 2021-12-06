// 具体如何让一个对象遍历呢, 比如下面的题干, 按照要求输出
const obj = {
  count: 0,
  [Symbol.iterator]: () => {
    return {
      next: () => {
        obj.count += 1;
        if (obj.count <= 10) {
          return {
            value: obj.count,
            done: false,
          }
        } else {
          return {
            value: undefined,
            done: true,
          }
        }
      }
    }
  },
}

for (const item of obj) {
  console.log(item) // 1 2 3 4 5 6 7 8 9 10
}