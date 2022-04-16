import React, { useState } from 'react'
import { Layout, Menu, Button, Modal } from 'antd';
import { Link } from 'react-scroll'
import homeimg from "../img/Group 1.png"
import homeimg2 from "../img/Group 2.png"
import homeimg3 from "../img/Group 3.png"
import homeimg4 from "../img/Group 4.png"
import homeimg5 from "../img/Group 5.png"
import icon from "../img/download.svg"
import { useNavigate } from 'react-router'
import FeatureCard from '../components/FeatureCard';
import { Helmet } from 'react-helmet';

const { Header, Content } = Layout;

function OnboardingScreen() {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    return (
        <Layout className="layout" style={{ fontFamily: 'Montserrat' }} >
            <Helmet>
                <meta charSet="utf-8" />
                <title>Welcome to Strogres</title>
            </Helmet>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <div>
                    <span style={{ display: 'flex', left: 20, marginTop: 0, fontFamily: 'Montserrat', position: 'absolute' }} >
                        <p style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} >Stro</p><p style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6A3D' }} >gres</p>
                    </span>
                </div>
                <Menu theme="dark" mode="horizontal" >
                    <Menu.Item ><Link to='about' spy={true} smooth={true} style={{}} >About</Link></Menu.Item>
                    <Menu.Item ><Link to='feature' spy={true} smooth={true} style={{}} >Features</Link></Menu.Item>
                    <Menu.Item ><a onClick={() => navigate('\auth')}  >Login</a></Menu.Item>
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
                        <Button onClick={() => setVisible(true)} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Get Started</Button>
                    </div>
                    <div style={{ width: "50vw", alignSelf: 'center', paddingLeft: "5vw" }}  >
                        <img alt="" src={homeimg} style={{ width: 500, height: 400 }} />
                    </div>
                </div>
                <div style={{ height: "100vh", backgroundColor: '#F8F3EF', position: 'relative' }} id="feature" >
                    <div style={{ position: 'absolute', top: '5%', left: '30%' }} >
                        <h2 style={{ textAlign: 'center', fontWeight: 'bolder', color: '#FF6A3D', fontSize: 30 }} >Why to Choose Us</h2>
                        <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }} >Make the right hire, faster with the leading recruiting software</p>
                    </div>
                    <div style={{ display: 'flex', position: 'absolute', top: '25%', left: '7%' }} >
                        <FeatureCard img={homeimg2} para="Find and attract candidates" />
                        <FeatureCard img={homeimg3} para="Move the right applicant forward" />
                        <FeatureCard img={homeimg4} para="Make the best hire, in the half time" />
                    </div>
                </div>
                <div style={{ height: '100vh', backgroundColor: '#f7f8f9', paddingTop: "10vh", display: 'flex', paddingInline: "10vw" }} id="about" >
                    <div style={{ width: "50vw", alignSelf: 'center' }}  >
                        <img alt="" src={homeimg5} style={{ width: "100%", height: '50%' }} />
                    </div>
                    <div style={{ width: "50vw", alignSelf: 'center', marginLeft: '10vw' }} >
                        <h1 style={{ fontSize: 40, fontWeight: 'bolder', color: '#000000' }} >About Us</h1>
                        <p style={{ fontSize: 15, color: '#000000' }} >Lorem Ipsum is simply dummy text of
                            the printing and typesetting industry.
                            Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type
                            and scrambled it to make a type
                            specimen book</p>
                    </div>

                </div>
                <div style={{ height: '30vh', backgroundColor: '#424242', position: 'relative' }} >
                    <div style={{ display: 'flex', position: 'absolute', left: "45%", top: '40%' }} >
                        <img alt="icon" src={icon} style={{ width: '4vw', height: '8vh' }} />
                        <span style={{ display: 'flex', marginLeft: 20, fontFamily: 'Montserrat', justifyContent: 'center', marginTop: 10 }} >
                            <p style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }} >Stro</p><p style={{ fontSize: 25, fontWeight: 'bold', color: '#FF6A3D' }} >gres</p>
                        </span>
                    </div>
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