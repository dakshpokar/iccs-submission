import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined,RubyOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: '/',
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Products',
    key: 'products',
    icon: <RubyOutlined />
  },
  {
    label: 'Cart',
    key: 'cart',
    icon: <ShoppingCartOutlined />
  },
];

const PageLayout = () => {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key)
    setCurrent(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={onClick}
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          display: 'flex',
          padding: '48px 48px',
        }}
      >
       
        <div
          style={{
            flex: 1,
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ICCS ©{new Date().getFullYear()} Created by Daksh
      </Footer>
    </Layout>
  );
};
export default PageLayout;