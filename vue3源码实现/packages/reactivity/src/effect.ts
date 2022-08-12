import { extend } from '@mini-vue/shared';

/**
 * 用于依赖收集
 */
export class ReactiveEffect {

}

/**
 * 找到依赖该effect的所有响应式对象，从响应式对象中删除effect
 * @param effect
 */
function cleanupEffect(effect) {

}

/**
 * 将传入的函数转化为reactiveEffect格式的函数
 * @param fn 传入函数
 * @param options 用户传过来的参数
 */
export function effect(fn, options = {}) {

}

export function stop(runner) {

}

/**
 * 把reactiveEffect添加为target[key]的观察者
 * @param target 
 * @param type 
 * @param key 
 */
export function track(target, type, key) {

}