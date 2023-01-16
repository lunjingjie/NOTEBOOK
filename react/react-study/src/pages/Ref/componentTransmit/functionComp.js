import { Button, Input } from 'antd';
import React, { useImperativeHandle, useRef, useState } from 'react';
function Son(props, ref) {
	const inputRef = useRef(null);
	const [inputValue, setInputValue] = useState('');
	useImperativeHandle(
		ref,
		() => {
			const handleRefs = {
				onFocus() {
					inputRef.current.focus();
				},
				onChangeValue(value) {
					setInputValue(value);
				}
			};
			return handleRefs;
		},
		[]
	);

	return (
		<div>
			<Input ref={inputRef} value={inputValue} placeholder="请输入内容"></Input>
		</div>
	);
}

const ForwardSon = React.forwardRef(Son);

export default class FunctionComp extends React.Component {
	cur = null;
	handleClick() {
		const { onFocus, onChangeValue } = this.cur;
		onFocus();
		onChangeValue('let us learn react');
	}
	render() {
		return (
			<div>
				<ForwardSon ref={(cur) => (this.cur = cur)}></ForwardSon>
				<Button type="primary" onClick={this.handleClick.bind(this)}>
					操控子组件
				</Button>
			</div>
		);
	}
}
