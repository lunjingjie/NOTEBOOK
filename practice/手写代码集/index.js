// new、instanceof、throttle、debounce、发布订阅模式、promise、实现call、apply、bind、深拷贝、柯里化、async/await

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
      clearTimeout(fn.id);4
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

Function.prototype.myBind = function (context, ...outArgs) {
  context = context ? Object(context) : window;
  // 使用Symbol可保证唯一性
  context.fn = this;

  return function (...innerArgs) { // 返回一个函数
    const result = context.fn(...outArgs, ...innerArgs) // outArgs和innerArgs都是一个数组，解构后传入函数
    // delete target[symbolKey] 这里千万不能销毁绑定的函数，否则第二次调用的时候，就会出现问题。
    return result;
  } 
}

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

/**
 * 实现对象深拷贝
 * @param {*} obj 对象
 * @param {*} hash 弱引用Map
 */
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) {
    return null;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const resObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, resObj);
  Reflect.ownKeys(obj).forEach(key => {
    resObj[key] = deepClone(obj[key], hash);
  });
  return resObj;
}

class b {
  text() {}
};

const a = {
  a: 1,
  b: {
    c: {
      e: [1, 2, 3],
    },
    d: new b().text,
  }
};
const map = new WeakMap();
const obj = deepClone(a, map);
a.b.d = ['23'];
console.log(obj);


/**
 * 实现发布订阅模式
 */
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    if (this._events[eventName]) {
      // 若不是一个新的event注册
      if (eventName !== 'newListener') {
        this.emit('newListener', ...args);
      }
    }
    const callbacks = this._events[eventName] || [];
    callbacks.push(callback);
    this._events[eventName] = callbacks;
  }

  emit(eventName, ...args) {
    this._events[eventName].forEach(cb => cb(...args));
  }

  once(eventName, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(eventName, callback);
    }
    one.initialCallback = callback;
    this.on(eventName, one);
  }

  off(eventName, callback) {
    const newCallbacks = this._events[eventName].filter(fn => fn !== callback && initialCallback !== callback);
    this._events[eventName] = newCallbacks;
  }
}

/**
 * 实现async、await
 * @param {*} generatorFunc 
 * @returns 
 */
function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        const {value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err));
        }
      }
      step('next');
    });
  }
}

// function asyncToGenerator(generatorFunc) {
//   return function () {
//     const gen = generatorFunc.apply(this, arguments);
//     return new Promise((resolve, reject) => {
//       function step(key, args) {
//         let generatorResult;
//         try {
//           generatorResult = gen[key](args);
//         } catch(err) {
//           return reject(err);
//         }

//         const { value, done } = generatorResult;
//         if (done) {
//           return resolve(value);
//         }
//         return Promise.resolve(value).then(val => step('next', val)).catch(err => step('throw', err));
//       }
//       step('next');
//     });
//   }
// }

// arr.flat(Infinity)解开无限嵌套的数组
// 手写flat，reduce实现（扁平化数组）
const arr = [1, [[2, 3], 4],5]
const flatten = (arr, deep = 1) => {
    if (deep <= 0) return arr;
    return arr.reduce((res, curr) => res.concat(Array.isArray(curr) ? flatten(curr, deep - 1) : curr), [])
}

// 循环实现
function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i])
    }
  }
  return result;
}