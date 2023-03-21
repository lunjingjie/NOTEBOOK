import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router, routerList } from './util/router';

const { Header, Sider, Content } = Layout;

function App() {
	const [collapsed, setCollapsed] = useState(false);
	const menuItems = routerList.map((item) => ({
		key: item.path,
		label: item.name
	}));
	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const clickMenu = (e) => {
		window.location.hash = e.key;
	};

  useEffect(() => {
    // const host = document.documentElement;
    // if (host.requestFullscreen) {
    //   host.requestFullscreen();
    // } else if (host.mozRequestFullScreen) {
    //   host.mozRequestFullScreen();
    // } else if (host.webkitRequestFullScreen) {
    //   host.webkitRequestFullScreen();
    // }
  }, []);

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
