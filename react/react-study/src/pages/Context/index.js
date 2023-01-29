import React from 'react';
import { Card, Tag } from 'antd';
import ProviderDemo from './MultiProvider';
import Provider1Demo from './SendProvider';
import ChangeTheme from './ChangeTheme';

const Index = () => {
	return (
		<>
			<Tag color="#108ee9">context高阶用法</Tag>
			<Card type="inner" title="嵌套Provider">
				<ProviderDemo></ProviderDemo>
			</Card>
			<Card type="inner" title="逐层传递Provider" style={{ marginTop: 10 }}>
				<Provider1Demo></Provider1Demo>
			</Card>
			<Card type="inner" title="改变主题颜色" style={{ marginTop: 10 }}>
				<ChangeTheme></ChangeTheme>
			</Card>
		</>
	);
};

export default Index;
