import React, { useEffect, useRef } from 'react';

function HOC(Component) {
	class Wrap extends React.Component {
		render() {
			const { forwardRef, ...otherProps } = this.props;
			return <Component ref={forwardRef} {...otherProps}></Component>;
		}
	}
	return React.forwardRef((props, ref) => <Wrap forwardRef={ref} {...props}></Wrap>);
}

class Index extends React.Component {
	render() {
		return <div>hello, world</div>;
	}
}

const HocIndex = HOC(Index);

export default function HomeHoc() {
	const node = useRef(null);
	useEffect(() => {
		console.log(node.current);
	}, []);
	return <HocIndex ref={node}></HocIndex>;
}
