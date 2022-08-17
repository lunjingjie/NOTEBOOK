import { extend } from '@mini-vue/shared';
import { createDep } from './dep';

let shouldTrack = false;
let activeEffect = void 0; // void永远都是返回undefined，不直接用undefined赋值是因为undefined可以被修改值
const targetMap = new WeakMap();
/**
 * 用于依赖收集
 */
export class ReactiveEffect {
  active = true;
  deps = []; // 用于存储所有依赖于这个effect的响应式对象
  public onStop?: () => void; // stop方法后的回调函数
  // public定义变量为全局可用
  constructor(public fn, public scheduler?) {
    console.log('创建ReactiveEffect对象');
  }

  run() {
    // active为false时不收集依赖，只执行用户传入fn
    if (!this.active) {
      return this.fn();
    }
    // 收集依赖
    shouldTrack = true;
    // 赋值为当前的effect
    activeEffect = this as any;
    const result = this.fn();
    // 执行结束后重置相应变量的值
    shouldTrack = false;
    activeEffect = undefined;
    return result;
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

/**
 * 找到依赖该effect的所有响应式对象，从响应式对象中删除effect
 * @param effect
 */
function cleanupEffect(effect) {
  effect.deps.forEach((element) => {
    element.delete(effect);
  });

  effect.deps.length = 0;
}

/**
 * 将传入的函数转化为reactiveEffect格式的函数,执行effect，返回给用户
 * @param fn 传入函数
 * @param options 用户传过来的参数
 */
export function effect(fn, options = {}) {
  const _effect = new ReactiveEffect(fn);
  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}

/**
 * 把reactiveEffect添加为target[key]的观察者
 * @param target 
 * @param type 
 * @param key 
 */
export function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  console.log(`track -> target: ${target} - type: ${type} - key: ${key}`);
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = createDep();
    depsMap.set(key, dep);
  }
  trackEffects(dep);
}

export function trackEffects(dep) {
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    (activeEffect as any).deps.push(dep);
  }
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, type, key) {
  // 1. 先收集所有的 dep 放到 deps 里面，
  // 后面会统一处理
  let deps: Array<any> = [];
  // dep

  const depsMap = targetMap.get(target);

  if (!depsMap) return;

  // 暂时只实现了 GET 类型
  // get 类型只需要取出来就可以
  const dep = depsMap.get(key);

  // 最后收集到 deps 内
  deps.push(dep);

  const effects: Array<any> = [];
  deps.forEach((dep) => {
    // 这里解构 dep 得到的是 dep 内部存储的 effect
    effects.push(...dep);
  });
  // 这里的目的是只有一个 dep ，这个dep 里面包含所有的 effect
  // 这里的目前应该是为了 triggerEffects 这个函数的复用
  triggerEffects(createDep(effects));
}

/**
 * 执行收集到的effect的run方法
 * @param target
 * @param type 
 * @param key 
 */
export function triggerEffects(dep) {
  // 执行收集到的所有的 effect 的 run 方法
  for (const effect of dep) {
    if (effect.scheduler) {
      // scheduler 可以让用户自己选择调用的时机
      // 这样就可以灵活的控制调用了
      // 在 runtime-core 中，就是使用了 scheduler 实现了在 next ticker 中调用的逻辑
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}