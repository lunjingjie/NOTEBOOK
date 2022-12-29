import React from 'react';
import { Card } from 'antd';
import ClassComp from './classComp';

class Index extends React.Component {
	render() {
		return (
			<>
				<Card type="inner" title="类组件">
          <ClassComp></ClassComp>
				</Card>
				<Card type="inner" title="函数组件" style={{ marginTop: 10 }}>
				</Card>
			</>
		);
	}
}

export default Index;
