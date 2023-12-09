import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router, routerList } from './util/router';
import './App.scss';
import CBreadcrumb from './components/antd/Breadcrumb';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = routerList.map((item) => ({
    key: item.path,
    label: item.name,
    icon: <MailOutlined />,
    children: [
      {
        key: item.path,
        label: item.name,
        icon: <MailOutlined />,
      },
    ],
  }));
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // side和menu背景颜色
  const sideBackgroundColor = 'rgb(47, 84, 235)';

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
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        // algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: sideBackgroundColor,
        },
        // 2. 组合使用暗色算法与紧凑算法
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Layout style={{ height: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: sideBackgroundColor, width: '208px', boxShadow: '2px 0 8px rgba(29,35,41,.05)' }}
        >
          <div className="logo">{collapsed ? 'LOGO' : '柯内特IOT平台'}</div>
          <Menu
            defaultSelectedKeys={['/basic1']}
            items={menuItems}
            onClick={clickMenu}
            mode="inline"
            style={{
              backgroundColor: sideBackgroundColor,
              color: '#fff',
            }}
          />
          <div style={{ color: '#d6d4d4', margin: '0 auto', position: 'fixed', bottom: 20, width: 208, padding: '0 20px' }}>
            { collapsed ? '柯内特' : 'Copyright©广东柯内特环境科技有限公司版权所有' }</div>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              height: 48,
              lineHeight: '48px',
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: '0 1px 4px rgba(0,21,41,.08)',
              backgroundColor: '#fff',
            }}
          >
            <div>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: { marginLeft: '20px', fontSize: '18px' },
                onClick: () => setCollapsed(!collapsed),
              })}
              <CBreadcrumb></CBreadcrumb>
            </div>
            <div>other components</div>
          </Header>
          <Content
            style={{
              margin: 3,
              minHeight: 280,
            }}
            className="layout-content"
          >
            <RouterProvider router={router}></RouterProvider>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
