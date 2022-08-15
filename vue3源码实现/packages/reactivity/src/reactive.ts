import { mutableHandlers, readOnlyHandlers, shallowReadonlyHandlers } from './baseHandlers';

/**
 * readOnly与shallowReadOnly区别：readOnly整个对象都是只读不能修改，shallowReadOnly最外层只读，除此之外可以修改值
 */

// 新建reactive、readOnly、shallowReadOnly存储proxy的map
export const reactiveMap = new WeakMap();
export const readOnlyMap = new WeakMap();
export const shallowReadOnlyMap = new WeakMap();

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
}

// 创建reactive对象
export function reactive(target) {
  return createReactiveObject(target, reactiveMap, mutableHandlers);
}

// 创建readOnly对象
export function readOnly(target) {
  return createReactiveObject(target, readOnlyMap, readOnlyHandlers);
}

// 创建shallowReadOnly对象
export function shallowReadOnly(target) {
  return createReactiveObject(target, shallowReadOnlyMap, shallowReadonlyHandlers);
}

export function isProxy(value) {
  return isReactive(value) || isReadOnly(value);  
}

/**
 * 判断是否响应式对象
 * @param value proxy对象
 * @returns 
 */
export function isReactive(value) {
  // 若不存在会返回undefined，需要转换为Boolean类型
  return !!value[ReactiveFlags.IS_REACTIVE];
}

/**
 * 判断是否响应式readOnly对象
 * @param value proxy对象
 * @returns 
 */
export function isReadOnly(value) {
  // 若不存在会返回undefined，需要转换为Boolean类型
  return !!value[ReactiveFlags.IS_READONLY];
}

export function toRaw(value) {
  if (!value[ReactiveFlags.RAW]) {
    return value;
  }
  return value[ReactiveFlags.RAW];
}

export function createReactiveObject(target, proxyMap, baseHandlers) {
  if (proxyMap.get(target)) {
    return proxyMap.get(target);
  }
  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}