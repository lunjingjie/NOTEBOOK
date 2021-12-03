// 你能实现一下基于proxy的响应式吗? 能够监听属性的删除操作? 要求最终的输出如下方代码所示
let observeStore = new Map();

function makeObservable(target) {
  // 避免重写了其他名为handler的handler
  let handlerName = Symbol('handler');
  observeStore.set(handlerName, []);

  target.observe = function (handler) {
    // 把自定义的监听器渲染规则push到数组中
    observeStore.get(handlerName).push(handler);
  }

  // 定义proxy
  const proxyHandler = {
    get(target, property, receiver) {
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], proxyHandler);
      }
      // 返回属性的值
      const success = Reflect.get(...arguments);
      if (success) {
        observeStore.get(handlerName).forEach(func => func('GET', property, target[property]));
      }

      return success;
    },
    set(target, property, value, receiver) {
      const success = Reflect.set(...arguments);
      if (success) {
        observeStore.get(handlerName).forEach(func => func('SET', property, value));
      }
      return success;
    },
    deleteProperty(target, property) {
      const success = Reflect.deleteProperty(...arguments);
      if (success) {
        observeStore.get(handlerName).forEach(func => func('DELETE', property), target[property]);
      }
      return success;
    },
  };

  // 返回proxy对象
  return new Proxy(target, proxyHandler);
}

let user = {
  a: {},
};

user = makeObservable(user);

// 自定义监听器渲染规则
user.observe((action, key, value) => {
  console.log(`${action} key=${key} value=${value || ''}`);
});

user.name = "John"; // SET key=name value=John
console.log(user.name); // GET key=name value=John  // John
delete user.name; // DELETE key=name value=

user.a.b = "test"