// new、instanceof、throttle、debounce、发布订阅模式、promise、实现call、apply、bind、深拷贝、柯里化

/**
 * 实现new操作符
 * @returns object
 */
function create() {
  // 使用第一个参数作为构造函数
  const Con = [].shift.apply(arguments);
  // 创建空对象
  const obj = Object.create(Con.prototype);
  // 修改this指向
  const ret = Con.apply(obj, arguments);
  console.log(arguments);
  return ret instanceof Object ? ret : obj;
}

function A() {}

const test = create(A, 1, 2);
console.log(test instanceof A);


/**
 * 实现instanceof
 * @param {*} left 实例对象
 * @param {*} right 构造函数
 */
function instanceOf(left, right) {
  if (typeof left !== 'object' || left === null) {
    return false;
  }
  while (true) {
    if (left === null) {
      return false;
    }
    if (left.__proto__ === right.prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

/**
 * 实现节流
 * @param {*} fn 
 * @param {*} delay 
 */
function throttle(fn, delay) {
  let last, deferTimer;
  return function (args) {
    const that = this;
    const _args = args;
    const now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(that, _args);
      }, delay);
    } else {
      last = now;
      fn.apply(that, _args);
    }
  }
}

/**
 * 实现防抖
 * @param {*} fn 
 * @param {*} delay 
 */
function debounce(fn, delay) {
  return function (args) {
    const that = this;
    const _args = args;
    clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn.apply(that, _args);
    }, delay);
  }
}

/**
 * 实现call
 * @param {*} context this参数
 * @returns 
 */
Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;

  let args = [...arguments].slice(1);
  const result = context.fn(...args);

  delete context.fn;
  return result;
}

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  }
}

console.log(bar.call(obj, 'lunjingjie', 13));

/**
 * 实现apply
 * @param {*} context this参数
 * @param {*} arr 传入的数组参数
 * @returns 
 */
Function.prototype.apply = function (context, arr) {
  context = context ? Object(context) : window;
  context.fn = this;

  let result;
  if (!arr) {
    result = context.fn();
  } else {
    result = context.fn(...arr);
  }
  return result;
}

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name,
    age,
  }
}

console.log(bar.apply(obj, ['lunjingjie', 13]));


/**
 * 实现柯里化函数
 * @param {*} fn 执行函数
 * @param {*} length 参数长度
 */
function currying(fn, length) {
  // 获取函数参数长度
  length = length || fn.length;
  return function (...args) {
    return args.length >= length ?
      fn.apply(this, args) : currying(fn.bind(this, ...args), length - args.length);
  }
}

const fn = currying(function (a, b, c) {
  console.log(a + b + c);
});

fn(1, 2)(4);
fn(1)(2)(4);

// 继承
function Parent() {
  this.name = 'parent';
}

function Child() {
  this.age = 13;
}

// 创建对象，创建父类原型的一个副本
Child.prototype = Object.create(Parent.prototype);
// 增强对象，弥补因重写原型而失去的默认的constructor 属性
Child.prototype.constructor = Child;


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