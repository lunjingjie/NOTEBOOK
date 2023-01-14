import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

const FunctionLifeCycle = (props) => {
	const [num, setNum] = useState(0);
	const { outputMsg } = props;

	useEffect(() => {
		// 组件挂在完成
		outputMsg('组件挂载完成....');
		return function componentWillUnmount() {
			// callback
			outputMsg('组件销毁....');
		};
	}, [outputMsg]);

	useEffect(() => {
		outputMsg('prop变化：componentWillReceiveProps');
	}, [props, outputMsg]);

	useEffect(() => {
		outputMsg('组件更新完成....');
	});

	return (
		<div>
			<div>props: {props.number}</div>
			<div>states: {num}</div>
			<Button type="primary" onClick={() => setNum((state) => state + 1)}>
				改变state
			</Button>
		</div>
	);
}
const message = [];
export default React.memo(() => {
	const [number, setNumber] = useState(0);
	const [isRender, setRender] = useState(true);

	const outputMsg = (msg) => { 
    console.log(msg);
    message.push(msg);
	};

	return (
		<div>
			{isRender && (
				<FunctionLifeCycle number={number} outputMsg={outputMsg}></FunctionLifeCycle>
			)}
			<Button
				style={{ marginRight: 10 }}
				type="primary"
				onClick={() => setNumber((state) => state + 1)}
			>
				改变props
			</Button>
			<Button style={{ marginTop: 10 }} type="primary" onClick={() => setRender(false)}>
				卸载组件
			</Button>
			{message.length
				? message.map((msg, index) => {
						return <div key={index}>{msg}</div>;
				  })
				: null}
		</div>
	);
});
