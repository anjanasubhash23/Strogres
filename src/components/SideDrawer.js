import React, { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";
import {
  PieChartOutlined,
  LogoutOutlined,
  PrinterOutlined,
  FileDoneOutlined,
  PlusCircleOutlined,
  BookOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router";
import "./SideDrawer.css"
import { Link } from "react-router-dom";
import PopupBox from "./PopupBox";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../store/action/auth";

const { Header, Content, Sider } = Layout;


export default function SideDrawer(props) {
  const { type } = useParams();
  const data = useSelector(x => x.auth.userData)
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false)
  const [urlType, setUrlType] = useState('');
  const location = useLocation()
  const handleok = value => {
    setVisible(value)
  }
  const handlecancel = value => {
    setVisible(value)
  }
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = async () => {
    await dispatch(LogOut())
    navigate('/')
  }
  // useEffect(() => {
  //   setUrlType(type)
  //   console.log(urlType)
  //   let str = urlType.trim();
  //   str = str.replaceAll(" ", "%20");
  //   console.log('%%%%%',str)
  //   setUrlType(str)
  // })

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" >
          {!collapsed ? <span style={{ display: 'flex', marginLeft: 15, marginTop: 15, fontFamily: 'Montserrat' }} >
            <p style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} >Stro</p><p style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6A3D' }} >gres</p>
          </span> : null}
        </div>
        <Menu theme="dark" mode="inline" style={{ fontSize: 16 }} >
          <Menu.Item icon={<PieChartOutlined style={{ color: location.pathname === '/admin/dashboard' ? "white" : 'grey' }} />}><Link to='/admin/dashboard' style={{ color: location.pathname === '/admin/dashboard' ? "white" : 'grey' }} >DashBoard</Link></Menu.Item>
          <Menu.Item icon={<FileDoneOutlined style={{ color: location.pathname === `/admin/job/${type}` || location.pathname === `/admin/job` ? "white" : 'grey' }} />}><Link to='/admin/job' style={{ color: location.pathname === `/admin/job/${type}` || location.pathname === `/admin/job` ? "white" : 'grey' }} >Job</Link></Menu.Item>
          <Menu.Item icon={<PrinterOutlined style={{ color: location.pathname === '/admin/parse' ? "white" : 'grey' }} />}  ><Link to='/admin/parse' style={{ color: location.pathname === '/admin/parse' ? "white" : 'grey' }} >Parse Resume</Link></Menu.Item>
          <Menu.Item icon={<BookOutlined style={{ color: location.pathname === '/admin/parsedata' ? "white" : 'grey' }} />}  ><Link to='/admin/parsedata' style={{ color: location.pathname === '/admin/parsedata' ? "white" : 'grey' }} >Parsed Data</Link></Menu.Item>
          <Menu.Item onClick={logout} icon={<LogoutOutlined />}>LogOut</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "#f7f8f9" }} >
          <div style={{ display: 'flex', justifyContent: "flex-end", marginRight: 20 }} >
            <div style={{ display: 'flex', justifyContent: 'center' }} >
              <Button onClick={() => setVisible(true)} style={{ borderRadius: 8, backgroundColor: '#E7DCDC', alignSelf: 'center' }} >
                <PlusCircleOutlined style={{ fontSize: 20, alignSelf: 'center', color: '#FF6A3D' }} />
              </Button>
              <h2 style={{ marginLeft: 20, fontFamily: "Montserrat", fontSize: 18 }} >{data.name}</h2>
            </div>
          </div>
        </Header>
        <Content >
          <div className="site-layout-background">
            {props.children}
            <PopupBox visible={visible} handleok={handleok} handlecancel={handlecancel} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
