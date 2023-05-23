import React, { useState } from 'react';
import {
  HomeOutlined,
  DoubleRightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadiusUprightOutlined,
  DoubleLeftOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/index";
import NoMatch from "./components/home/noMatch";
import Cikislar from "./components/cikislar/CikislarList";
import Girisler from "./components/girisler/GirislerList";
import HarcamaTuru from "./components/harcamaTuru/HarcamaTurleriList";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={[
            {
              key: '0',
              icon: <HomeOutlined />,
              label: <Link to="/">Ana Sayfa</Link>,
            },
            {
              key: '1',
              icon: <DoubleRightOutlined />,
              label: <Link to="/cikislar">Çıkışlar</Link>,
            },
            {
              key: '2',
              icon: <DoubleLeftOutlined />,
              label: <Link to="/girisler">Girişler</Link>,
            },
            {
              key: '3',
              icon: <RadiusUprightOutlined />,
              label: <Link to="/harcama-turleri">Harcama Türleri</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {JSON.stringify(Routes)}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cikislar" element={<Cikislar />} />
            <Route path="girisler" element={<Girisler />} />
            <Route path="harcama-turleri" element={<HarcamaTuru />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Content>
      </Layout>
    </Layout >
  );
};

export default App;
