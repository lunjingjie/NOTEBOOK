/* 
* 函数式编程
* 需求：组合多个函数，使函数执行多个函数，实现入参、输出结果
* 前提：参数对齐，目前都是一元函数，因为reduce只会入一个参数
*/
function add(num) {
  return num + 10;
}

function multi(num) {
  return num * 2;
}

function pipe(...funcs) {
  function callbacks(input, func) {
    return func(input);
  }

  return function(param) {
    // 顺序reduce，倒序reduceRight
    return funcs.reduce(callbacks, param);
  }
}

const compute = pipe(add, multi);

const result = compute(10);
console.log(result);