export const isObject = (val) => {
  return val !== null && typeof val === 'object';
}

export const extend = Object.assign;

export const hasChanged(value, oldValue) {
  return !Object.is(value, oldValue);
}