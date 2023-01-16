import { useEffect, useRef } from 'react';
import { Button } from 'antd';

const toLearn = [
	{ type: 1, mes: 'let us learn React' },
	{ type: 2, mes: 'let us learn Vue3.0' }
];

export default function CacheData() {
	const typeInfo = useRef(toLearn[0]);
	const changeType = (info) => {
		typeInfo.current = info;
    console.log(typeInfo.current);
	};
	useEffect(() => {
		if (typeInfo.current.type === 1) {
			console.log(typeInfo.current);
		}
    console.log('update');
	});
	return (
		<div>
			{toLearn.map((item) => (
				<Button type="primary" key={item.type} onClick={() => changeType(item)}>
					{item.mes}
				</Button>
			))}
		</div>
	);
}
