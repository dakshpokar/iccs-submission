import React, { useState } from 'react';
import { Layout, Menu, theme, Button, Badge } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined,RubyOutlined } from '@ant-design/icons';
import { useShoppingCart } from '../context/ShoppingCartContext';

const { Header, Content, Footer } = Layout;

const items = [
  {
    label: 'Products',
    key: '/',
    icon: <RubyOutlined />
  },
];

const PageLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openCart, cartQuantity } = useShoppingCart();

  const onClick = (e) => {
    navigate(e.key)
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
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={onClick}
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Badge count={cartQuantity}>
          <Button type="primary" onClick={openCart} shape="circle" icon={<ShoppingCartOutlined />} style={{padding: '5px'}}/>
        </Badge>
      </Header>
      <Content
        style={{
          padding: '48px 48px',
        }}
      >
       
        <div
          style={{
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