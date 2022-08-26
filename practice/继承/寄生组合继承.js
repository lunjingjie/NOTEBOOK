function Parent() {
  this.name = 'parent';
}

function Child() {
  this.age = 13;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;