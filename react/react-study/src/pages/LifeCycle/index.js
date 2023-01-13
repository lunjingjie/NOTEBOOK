import React from 'react';
import { Card } from 'antd';
import FunctionComp from './functionComp';

const Index = () => {
	return (
		<>
			<Card type="inner" title="类组件"></Card>
			<Card type="inner" title="函数组件" style={{ marginTop: 10 }}>
        <FunctionComp></FunctionComp>
      </Card>
		</>
	);
};

export default Index;
