// 那Vue对于数组类型是怎么处理的? 你能简单模拟一下对于数组方法的监听吗? 要求最终的输出如下方代码所示
const arrayPrototype = Array.prototype;
const newPrototype = Object.create(arrayPrototype);

const render = (methodName, ...args) => {
  console.log(`${methodName}, args: ${args.join('、')}`);
}

// 重写原型方法，增加render函数
['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(methodName => {
  newPrototype[methodName] = function() {
    // 把原来数组的this传过去，保证方法与原来一样使用
    arrayPrototype[methodName].call(this, ...arguments);
    render(methodName, ...arguments);
  }
});

const reactive = (obj) => {
    if (Array.isArray(obj)) {
      // 设置当前数组的原型为重写的原型
      obj.__proto__ = newPrototype;
    }
}

const data = [1, 2, 3, 4]
reactive(data)

data.push(5) // Action = push, args=5
data.splice(0, 2) // Action = splice, args=0,2