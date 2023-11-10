class Calculator {
	plugins = [];
	constructor() {}

	// 插件化设计
	// 1.插件底座
	// 2.插件注册方式
	// 3.调用对应插件
	use(plugin) {
		this.plugins.push(plugin);
		this[plugin.name] = plugin.fn;
	}
}

const AddPlugin = {
	name: 'add',
	fn(a, b) {
		return a + b;
	}
}

const calculator = new Calculator();
calculator.use(AddPlugin);
console.log(calculator.add(1, 3));
