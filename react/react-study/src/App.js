import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './util/router';
import { menuList } from './util/menu';

const { Header, Sider, Content } = Layout;

function App() {
	const [collapsed, setCollapsed] = useState(false);
	const menuItems = menuList.map((item) => ({
		key: item.path,
		label: item.name
	}));
	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const clickMenu = (e) => {
		window.location.hash = e.key;
	};

	return (
		<Layout style={{ height: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed} theme="light">
				<div className="logo" />
				<Menu
					theme="light"
					mode="inline"
					defaultSelectedKeys={['/jsx']}
					items={menuItems}
					onClick={clickMenu}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					style={{
						padding: 0,
						background: colorBgContainer
					}}
				>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						style: { marginLeft: '20px', fontSize: '18px' },
						onClick: () => setCollapsed(!collapsed)
					})}
					<span style={{ fontSize: '20px', fontWeight: 700, marginLeft: '20px' }}>
						React
					</span>
				</Header>
				<Content
					style={{
						margin: '20px 18px',
						minHeight: 280,
					}}
				>
					<RouterProvider router={router}></RouterProvider>
				</Content>
			</Layout>
		</Layout>
	);
}

export default App;
