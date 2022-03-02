import React from 'react'
import { Button, Layout, Menu, Breadcrumb, Dropdown } from "antd";
import "./TopNavBar.css"

import {
  UserOutlined
} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../../store/action/auth';

const { Header, Content, Footer } = Layout;

export default function TopNavBar(props) {
  const data = useSelector(x => x.auth.userData)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = async () => {
    await dispatch(LogOut())
    navigate('/')
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/admin/job">Edit Profile</a>
      </Menu.Item>
      <Menu.Item onClick={logout} >
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ fontFamily: 'Montserrat' }} >
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div>
          <span style={{ display: 'flex', left: 20, marginTop: 0, fontFamily: 'Montserrat', position: 'absolute' }} >
            <p style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} >Stro</p><p style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6A3D' }} >gres</p>
          </span>
        </div>
        <Menu theme="dark" mode="horizontal" >

          <Menu.Item ><Link to='/user/explore' style={{ color: location.pathname === '/user/explore' ? "white" : 'grey' }} >Explore</Link></Menu.Item>
          <Menu.Item ><Link to='/user/dashboard' style={{ color: location.pathname === '/user/dashboard' ? "white" : 'grey' }} >My Application</Link></Menu.Item>
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
              {data.name}
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
