import { hasChanged, isObject } from "@mini-vue/shared";
import { createDep } from "./dep";
import { isTracking, trackEffects, trigger, triggerEffects } from "./effect";
import { reactive } from "./reactive";

export class RefImpl {
  
  private _rawValue: any; // 保存原始对象，用左set的时候比较值，变化才出发trigger
  private _value: any; // 保存ref对象
  public dep;
  public __v_isRef = true; // 是否为ref

  constructor(value) {
    // 初始化赋值
    this._rawValue = value;
    // 若值为对象，则需要reactive包裹
    this._value = convert(value);
    this.dep = createDep();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this);
    }
  }
}

export function ref(value) {
  return createRef(value);
}

function convert(value) {
  return  isObject(value) ? reactive(value) : value;
}

function createRef(value) {
  return new RefImpl(value);
}

export function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function triggerRefValue(ref) {
  triggerEffects(ref.dep);
}

// 通过proxy来对ref做处理，解构ref，使其在template中不需要使用.value来调用
const shallowUnwrapHandlers = {
  get(target, key, receiver) {
    return unRef(Reflect.get(target, key, receiver));
  },
  set(target, key, value, receiver) {
    // 确保set的是ref，这样才能在get的时候进行解构
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      return target[key].value = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
};

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function isRef(value) {
  return !!value.__v_isRef;
}