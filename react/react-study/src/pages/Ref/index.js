import React from 'react';
import { Card, Tag } from 'antd';
import GrandFather from './forwardRef/thoughtLevel.js';
import Home from './forwardRef/combineRef.js';
import HomeHoc from './forwardRef/Hoc.js';
import Father from './componentTransmit/classComp.js';
import FunctionComp from './componentTransmit/functionComp.js';
import CacheData from './cacheData/index.js';

const Index = () => {
	return (
		<>
      <Tag color="#108ee9">forwardRef转发Ref</Tag>
			<Card type="inner" title="跨层级获取ref">
        <GrandFather></GrandFather>
      </Card>
      <Card type="inner" title="合并转发" style={{ marginTop: 10 }}>
        <Home></Home>
      </Card>
      <Card type="inner" title="高阶组件转发" style={{ marginTop: 10 }}>
        <HomeHoc></HomeHoc>
      </Card>
      <Tag color="#108ee9" style={{ marginTop: 10 }}>ref实现组件通信</Tag>
      <Card type="inner" title="类组件ref">
        <Father></Father>
      </Card>
      <Card type="inner" title="函数组件ref" style={{ marginTop: 10 }}>
        <FunctionComp></FunctionComp>
      </Card>
			<Tag color="#108ee9" style={{ marginTop: 10 }}>函数组件缓存数据</Tag>
      <Card type="inner" title="缓存数据">
        <CacheData></CacheData>
      </Card>
		</>
	);
};

export default Index;
