import React from 'react';
import { Card } from 'antd';

const Index = () => {
	return (
		<>
			<Card type="inner" title="类组件"></Card>
			<Card type="inner" title="函数组件" style={{ marginTop: 10 }}></Card>
		</>
	);
};

export default Index;
