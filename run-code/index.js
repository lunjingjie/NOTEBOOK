function myNew() {
  const ConstructionFunc = [].shift.call(arguments);
  const obj = Object.create(ConstructionFunc.prototype);
  console.log(obj);
  obj.__proto__ = ConstructionFunc.prototype;
  const ret = ConstructionFunc.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}

function MyClass(a) {
  this.test1 = a;
}

const a = myNew(MyClass, 1);
console.log(a.test1);
