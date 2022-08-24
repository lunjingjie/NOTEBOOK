function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) {
    return null;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const resObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, resObj);
  Reflect.ownKeys(obj).forEach(key => {
    resObj[key] = deepClone(obj[key], hash);
  });

  return resObj;
}

class b {
  text() {
  }
};

const a = {
  a: 1,
  b: {
    c: {
      e: [1, 2, 3],
    },
    d: new b().text,
  }
};

const map = new WeakMap();
const obj = deepClone(a, map);
a.b.d = ['23'];
console.log(obj.b.c.e);