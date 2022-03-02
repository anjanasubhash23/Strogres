import React from 'react'
import { Button, Layout, Menu, Breadcrumb, Dropdown } from "antd";
import "./TopNavBar.css"

import {
UserOutlined
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export default function TopNavBar(props) {
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="/admin/job">Edit Profile</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/admin/job">Log Out</a>
        </Menu.Item>
      </Menu>
    );

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div>
          <span style={{ display: 'flex', left:20, marginTop: 0, fontFamily: 'Montserrat', position:'absolute' }} >
            <p style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} >Stro</p><p style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6A3D' }} >gres</p>
          </span>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item  key="1">Explore</Menu.Item>
          <Menu.Item key="2">My Applications</Menu.Item>
        </Menu>
        <Dropdown
          className="navbarDropdown"
          overlay={menu}
          placement="bottomCenter"
        >
          <div className="navbarDropdown_container">
            <UserOutlined className="navbarDropdown_icon" />
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Praful Kumar
            </a>
          </div>
        </Dropdown>
      </Header>

      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        {props.children}
      </Content>
    </Layout>
  );
}
