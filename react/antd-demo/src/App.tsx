import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router, routerList } from './util/router';
import './App.scss';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const menuItems = routerList.map((item) => ({
		key: item.path,
		label: item.name,
    icon: <MailOutlined />
	}));
	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const clickMenu = (e: any) => {
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
			<Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
				<div className="logo" />
				<Menu
					theme="dark"
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
						background: colorBgContainer,
            height: 48,
            lineHeight: '48px'
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
						margin: 3,
						minHeight: 280,
					}}
          className='layout-content'
				>
					<RouterProvider router={router}></RouterProvider>
				</Content>
			</Layout>
		</Layout>
	);
}

export default App;
