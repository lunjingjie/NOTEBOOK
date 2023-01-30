import React from 'react';
import { Card } from 'antd';
import ClickEventHoc from './ClickEventHoc';

const Index = () => {
	return (
		<>
			<Card type="inner" title="事件监控">
				<div>
					<ClickEventHoc></ClickEventHoc>
					<button>组件外部点击</button>
				</div>
			</Card>
			<Card type="inner" title="函数组件" style={{ marginTop: 10 }}></Card>
		</>
	);
};

export default Index;
