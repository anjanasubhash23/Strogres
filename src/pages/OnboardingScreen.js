import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import homeimg from "../img/Group 1.png"
import { useNavigate } from 'react-router'

const { Header, Content } = Layout;

function OnboardingScreen() {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <Layout className="layout" style={{ fontFamily: 'Montserrat' }} >
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <div>
                    <span style={{ display: 'flex', left: 20, marginTop: 0, fontFamily: 'Montserrat', position: 'absolute' }} >
                        <p style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} >Stro</p><p style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6A3D' }} >gres</p>
                    </span>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item ><a href='#about' style={{}} >About</a></Menu.Item>
                    <Menu.Item ><Link to='' style={{}} >Features</Link></Menu.Item>
                    <Menu.Item ><Link to='/auth' style={{}} >Login</Link></Menu.Item>
                    <Menu.Item > <a onClick={() => setVisible(true)}  >Register</a></Menu.Item>
                </Menu>
            </Header>
            <Content  >
                <div className="site-layout-content" style={{ backgroundColor: "#1A2238", paddingTop: "10vh", height: "100vh", display: 'flex', paddingInline: "10vw" }} >
                    <div style={{ width: "50vw", alignSelf: 'center', paddingRight: "5vw" }} >
                        <h1 style={{ fontSize: 40, fontWeight: 'bolder', color: '#f7f8f9' }} >A recruiting software
                            that brings big ideas and
                            talents together.</h1>
                        <p style={{ fontSize: 15, color: '#f7f8f9' }} >Scalable features,tools and support to help you at
                            every stage of the hiring process</p>
                        <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Get Started</Button>
                    </div>
                    <div style={{ width: "50vw", alignSelf: 'center', paddingLeft: "5vw" }}  >
                        <img alt="" src={homeimg} style={{ width: 500, height: 400 }} />
                    </div>
                </div>
                <div style={{ height: "100vh", backgroundColor: '#F8F3EF' }} id="about" >

                </div>
                <div style={{ height: '100vh', backgroundColor: '#f7f8f9' }} >

                </div>
                <Modal title={"Who are You"} width={300} visible={visible} onCancel={() => setVisible(false)} footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>]}  >
                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <Button onClick={() => navigate('/register/Emp')} style={{ borderRadius: 10, fontFamily: 'Montserrat', backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Company</Button>
                        <Button onClick={() => navigate('/register/App')} style={{ borderRadius: 10, fontFamily: 'Montserrat', backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Applicant</Button>
                    </div>
                </Modal>
            </Content>
        </Layout>
    )
}

export default OnboardingScreen