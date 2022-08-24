// 1.术语
// （1）"promise"是一个对象或者函数，该对象或者函数有一个then方法

// （2）"thenable"是一个对象或者函数，用来定义then方法

// （3）"value"是promise状态成功时的值

// （4）"reason"是promise状态失败时的值

// 我们明确术语的目的，是为了在自己实现promise时，保持代码的规范性（也可以跳过此小节）

// 2.要求
// （1）一个promise必须有3个状态，pending，fulfilled(resolved)，rejected当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态。当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。

// promise英文译为承诺，也就是说promise的状态一旦发生改变，就永远是不可逆的。

// （2）一个promise必须有一个then方法，then方法接受两个参数：

// promise.then(onFulfilled,onRejected)
// 其中onFulfilled方法表示状态从pending——>fulfilled(resolved)时所执行的方法，而onRejected表示状态从pending——>rejected所执行的方法。

// （3）为了实现链式调用，then方法必须返回一个promise

// promise2=promise1.then(onFulfilled,onRejected)

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
  let that = this; // 缓存当前promise实例
  that.status = PENDING; // 初始状态
  that.value = undefined; // fulfilled状态时返回的值
  that.reason = undefined; // rejected状态时返回的值
  that.onFulfilledCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolved(value) {
    // value是成功状态时接收的终值
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.status === PENDING) {
        // 只能由pending状态 =》fulfilled状态
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(cb => cb(that.value));
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach(cb => cb(that.reason));
      }
    });
  }

  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  // 处理默认值
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason;
  };

  if (that.status === FULFILLED) {
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (that.status === REJECTED) {
    return newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (that.status === PENDING) {
    return newPromise = new Promise((resolve, reject) => {
      // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
      that.onFulfilledCallbacks.push((value) => {
        try {
          const x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      that.onRejectedCallbacks.push((reason) => {
        try {
          const x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
}