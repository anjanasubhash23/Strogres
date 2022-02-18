import React from 'react'
import { Layout } from 'antd';
import LoginCard from '../components/LoginCard';

function AuthPage() {
    return (
        <Layout>
            <Layout.Header style={{ backgroundColor: '#1A2238' }} >
                <div className='logo' >
                    <span style={{ display: 'flex' }} ><h2 style={{ color: 'white', fontFamily: 'Montserrat' }} >Hire</h2><h2 style={{ color: '#FF6A3D', fontFamily: 'Montserrat' }} >Lab</h2></span>
                </div>
            </Layout.Header>
            <Layout.Content style={{ backgroundColor: '#1A2238', width: "100vw", height: '90.6vh' }} >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }} >
                    <LoginCard />
                </div>
            </Layout.Content>
        </Layout>
    )
}

export default AuthPage