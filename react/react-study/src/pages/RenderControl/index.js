import React from 'react';
import { Card, Tag } from 'antd';

const Index = () => {
	return (
		<>
			<Tag color="#108ee9">控制渲染</Tag>
			<Card type="inner" title="">
				<span>1. 自定义缓存 element 对比<br />2. useMemo 逻辑依赖判断<br />3. PureComponent 浅对比<br /> (1) 注意
				箭头函数 & Function 包裹 class 混合 使用。<br />4. shouldComponentUpdate 生命周期</span>
			</Card>
			<Card type="inner" title="" style={{ marginTop: 10 }}></Card>
		</>
	);
};

export default Index;
