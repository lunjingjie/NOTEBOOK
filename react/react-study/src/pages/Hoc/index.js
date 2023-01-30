import React from 'react';
import { Card } from 'antd';
import ClickEventHoc from './ClickEventHoc';
import PermissControl from './demo';

const Index = () => {
	return (
		<>
			<Card type="inner" title="事件监控">
				<div>
					<ClickEventHoc></ClickEventHoc>
					<button>组件外部点击</button>
				</div>
			</Card>
			<Card type="inner" title="权限控制demo" style={{ marginTop: 10 }}>
        <PermissControl></PermissControl>
      </Card>
		</>
	);
};

export default Index;
