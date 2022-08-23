/**
 * 利用generator函数实现async await语法糖
 */

// 通用功能
function func(num) {
  return new Promise((resolve) => {
    resolve(num * 2);
  });
}

// generator函数实现
function* generator() {
  const num1 = yield func(1);
  const num2 = yield func(num1);
  const num3 = yield func(num2);
  return num3; 
}

// 封装promise处理操作
function generatorAsyncFunc(gen) {
  return function() {
    return new Promise((resolve) => {
      const g = gen();
      const next1 = g.next().value;
      next1.then((res1) => {
        console.log(res1);
        const next2 = g.next(res1).value;
        return next2;
      }).then((res2) => {
        console.log(res2);
        const next3 = g.next(res2).value;
        return next3;
      }).then((res3) => {
        resolve(g.next(res3).value);
      });
    });
  }
}

const asyncFunc = generatorAsyncFunc(generator);
asyncFunc().then((res) => {
  console.log('qqq');
  console.log(res);
})