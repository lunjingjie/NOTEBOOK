function Parent() {
  this.name = 'parent';
}

function Child() {
  this.age = 13;
}

// 创建对象，创建父类原型的一个副本
Child.prototype = Object.create(Parent.prototype);
// 增强对象，弥补因重写原型而失去的默认的constructor 属性
Child.prototype.constructor = Child;
