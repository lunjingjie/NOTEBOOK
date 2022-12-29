import React from 'react';
import Parent from './classComp';
import ParentFunc from './funcComp';
import { Card } from 'antd';

class Index extends React.Component {
	render() {
		return (
			<>
				<Card type="inner" title="类组件">
					<Parent />
				</Card>
				<Card type="inner" title="函数组件" style={{ marginTop: 10 }}>
					<ParentFunc />
				</Card>
			</>
		);
	}
}

export default Index;
