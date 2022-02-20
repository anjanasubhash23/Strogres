import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import {
  PieChartOutlined,
  InboxOutlined,
  LogoutOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from 'react-router'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function SideDrawer(props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item onClick={() => navigate('/dashboard')} icon={<PieChartOutlined />}>DashBoard</Menu.Item>
          <Menu.Item icon={<InboxOutlined />}>Inbox</Menu.Item>
          <Menu.Item icon={<WorkIcon />}>Job </Menu.Item>
          <Menu.Item icon={<PrinterOutlined />}>Parse Resume</Menu.Item>
          <Menu.Item icon={<LogoutOutlined />}>LogOut</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          Hire Lab
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.body}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
