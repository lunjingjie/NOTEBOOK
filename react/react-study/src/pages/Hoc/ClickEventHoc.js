import React, { useEffect, useRef } from 'react';

/**
 * 事件监控
 */
function ClickHoc(Component) {
	return function Wrap(props) {
		const dom = useRef(null);
		useEffect(() => {
			const handleClick = () => console.log('发生了点击事件');
			dom.current.addEventListener('click', handleClick);
			return () => dom.current.removeEventListener('click', handleClick);
		}, []);
		return (
			<div ref={dom}>
				<Component {...props} />
			</div>
		);
	};
}

function Index() {
	return (
		<div>
			<p>hello</p>
			<button>组件内部点击</button>
		</div>
	);
}

export default ClickHoc(Index);
