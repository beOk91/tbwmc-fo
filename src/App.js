import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import AdminUserList from './pages/AdminUserList';
import AdminUserSchedule1 from './pages/AdminUserSchedule1';
import AdminUserSchedule2 from './pages/AdminUserSchedule2';
import AdminUserSchedule3 from './pages/AdminUserSchedule3';

function App() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const { Header, Content, Footer } = Layout;
  const [current, setCurrent] = useState('/user');

  // 페이지 최초 실행 시 실행(useEffect)
  useEffect(() => {
    console.log('---------------- pathname ----------------');
    console.log('location.pathname : ' + location.pathname);
    
    // 새로고침 시 페이지 Path에 따른 분기처리
    if (location.pathname === '/') {
      setCurrent('/user');
    } else {
      setCurrent(location.pathname);
    }

    navigate(location.pathname);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuList = [
    {
      label: <Link to="/user">회원관리</Link>,
      key: "/user",
    },
    {
      label: <Link to="/lesson1">수강관리(1)</Link>,
      key: "/lesson1",
    },
    {
      label: <Link to="/lesson2">수강관리(2)</Link>,
      key: "/lesson2",
    },
    {
      label: <Link to="/lesson3">수강관리(3)</Link>,
      key: "/lesson3",
    },
  ];

  const onMenu = e => {
    setCurrent(e.key);
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark"
          mode="horizontal"
          defaultSelectedKeys={location.pathname === '/' ? '/user': [location.pathname]}
          onClick={onMenu}
          items={menuList}
        />
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        {current === '/user' &&
          <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <AdminUserList />
          </div>
        }
        {current === '/lesson1' &&
          <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <AdminUserSchedule1 />
          </div>
        }
        {current === '/lesson2' &&
          <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <AdminUserSchedule2 />
          </div>
        }
        {current === '/lesson3' &&
          <div style={{ padding: 15, minHeight: 380, background: colorBgContainer }}>
            <AdminUserSchedule3 />
          </div>
        }
      </Content>
      <Footer style={{ textAlign: 'center' }}>ToyProject ©2023 Created by DevOps</Footer>
    </Layout>
  );
};

export default App;
