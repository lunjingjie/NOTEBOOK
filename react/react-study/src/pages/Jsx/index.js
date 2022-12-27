import React, { useState } from 'react';
import { Button, Card } from 'antd';

const JsxComponent = () => {
	const [status] = useState(false);
	const toLearn = ['react', 'vue', 'webpack', 'nodejs'];

	const TextComponent = () => <div> hello , i am function component </div>;
	const renderFoot = () => <div> i am foot</div>;

	// 修改render函数
	const modifyRender = () => {
		// 扁平化
		const reactElement = render();
		const { children } = render().props;
		const flatChildren = React.Children.toArray(children);
		// 去除文本节点
		const newChildren = [];
		React.Children.forEach(flatChildren, (item) => {
			if (React.isValidElement(item)) {
				newChildren.push(item);
			}
		});
		// 插入新节点
		const lastChildren = React.createElement(
			'div',
			{ style: { fontWeight: 700, fontSize: 20 } },
			'这是修改render后的插入节点'
		);
		newChildren.push(lastChildren);
		// 修改容器节点
		const newReactElement = React.cloneElement(reactElement, {}, ...newChildren);
		return newReactElement;
	};

	const render = () => {
		return (
			<div>
				{/* element 元素类型 */}
				<div>hello,world</div>
				{/* fragment 类型 */}
				<React.Fragment>
					<div> 👽👽 </div>
				</React.Fragment>
				{/* text 文本类型 */}
				my name is alien
				{/* 数组节点类型 */}
				{toLearn.map((item) => (
					<div key={item}>let us learn {item} </div>
				))}
				{/* 组件类型 */}
				<TextComponent />
				{/* 三元运算 */}
				{status ? <TextComponent /> : <div>三元运算</div>}
				{/* 函数执行 */}
				{renderFoot()}
				<Button danger onClick={() => console.log(render())}>
					打印render后的内容
				</Button>
			</div>
		);
	};

	return (
		<>
			<Card type="inner" title="原输出">
				{render()}
			</Card>
			<Card
				style={{
					marginTop: 16
				}}
				type="inner"
				title="修改render后输出"
			>
				{modifyRender()}
			</Card>
		</>
	);
};

export default React.memo(JsxComponent);
