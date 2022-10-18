// 观察者 数据劫持
const Observer = (target) => {
  Object.keys(target).forEach((key) => {
    defineReactive(target, key);
  });
}

const defineReactive = (target, key) => {
  const dep = new Dep();
  let value = target[key];
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log('触发get方法');
      // 依赖收集
      dep.depend();
      // 返回值
      return value;
    },
    set(newVal) {
      if (newVal === value) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  });
}

const Dep = function() {
  const self = this;
  this.target = null;
  this.subs = [];

  this.depend = () => {
    if (Dep.target) {
      Dep.target.addDep(self);
    }
  }

  this.addSub = (watcher) => {
    self.subs.push(watcher);
  }

  this.notify = () => {
    self.subs.forEach((sub) => {
      sub.update();
    });
  }
}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  Dep.target = this;

  this.addDep = (dep) => {
    dep.addSub(self);
  }

  this.update = () => {
    console.log('触发update');
    fn();
  }

  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  Dep.target = null;
}

const observe = (data) => {
  Observer(data);
}

const Vue = function(options) {
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function() {
    new Watcher(self, self.render);
  }
  // 渲染函数
  this.render = function() {
    with(self) {
      _data.text;
    }
  }
  // 监听this._data
  observe(this._data);  
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})

vue.mount();
vue._data.text = '123';