const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = new Set());
  }
  dep.add(activeEffect);
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (depsMap) {
    let dep = depsMap.get(key);
    if (dep) {
      dep.forEach((effect) => {
        effect();
      });
    }
  }
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log('触发get........');
      track(receiver, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log('触发set........');
      Reflect.set(target, key, value, receiver);
      trigger(receiver, key);
    }
  }
  return new Proxy(target, handler);
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  activeEffect();
  activeEffect = null;
}

function ref(value) {
  return reactive({
    value,
  });
}

function computed(fn) {
  const result = ref();
  effect(() => ref.value = fn());
  return result;
}

// 测试响应式
// const person = reactive({
//   name: 'lunjingjie',
//   age: 26,
// });

// effect(() => {
//   console.log(`${person.name}, ${person.age}`);
// });

// person.age = 27;

// 测试ref
// const refName = ref(5);
// effect(() => {
//   console.log(`${refName.value}`);
// });
// refName.value = 6;

// 测试computed
// const number = ref(1);
// const test = computed(() => {
//   console.log(`${number.value}` + 1);
// });

// number.value = 2;