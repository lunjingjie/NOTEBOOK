import { isObject } from "@mini-vue/shared"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, reactiveMap, readOnly, readOnlyMap, shallowReadOnlyMap } from "./reactive"

const get = createGetter();
const set = createSetter();
const readOnlyGetter = createGetter(true);
const shallowReadOnlyGetter = createGetter(true, true);

function createGetter(isReadOnly = false, shallow = false) {
  return function get(target, key, receiver) {
    // 下列三个方法判断是否是已存在的原始对象
    const isExistInReactiveMap = () => key === ReactiveFlags.RAW && receiver === reactiveMap.get(target);
    const isExistInReadOnlyMap = () => key === ReactiveFlags.RAW && receiver === readOnlyMap.get(target);
    const isExistInShallowReadOnlyMap = () => key === ReactiveFlags.RAW && receiver === shallowReadOnlyMap.get(target);

    // 判断key是否是标记键，是则不返回值
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadOnly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadOnly;
    } else if (isExistInReactiveMap() || isExistInReadOnlyMap() || isExistInShallowReadOnlyMap()) {
      return target;
    }

    // 非标记键，则开始取值、依赖收集
    const res = Reflect.get(target, key, receiver);
    if (!isReadOnly) {
      // 收集依赖
      track(target, 'get', key);
    }
    if (shallow) {
      return res;
    }
    if (isObject(res)) {
      return isReadOnly ? readOnly(res) : reactive(res);
    }
    return res;
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    trigger(target, 'set', key);
    return result;
  }
}

export const mutableHandlers = {
  get,
  set,
}

export const readOnlyHandlers = {
  get: readOnlyGetter,
  set(target, key) {
    // readonly 的响应式对象不可以修改值
    console.warn(
      `Set operation on key "${String(key)}" failed: target is readonly.`,
      target
    );
    return true;
  },
}

export const shallowReadonlyHandlers = {
  get: shallowReadOnlyGetter,
  set(target, key) {
    // readonly 的响应式对象不可以修改值
    console.warn(
      `Set operation on key "${String(key)}" failed: target is readonly.`,
      target
    );
    return true;
  },
}