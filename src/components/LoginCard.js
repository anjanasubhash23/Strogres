import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { LoginHandler } from '../store/action/auth';
import { toast, ToastContainer } from 'react-toastify';

function LoginCard() {
    const [option, setOption] = useState(true)
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginhandler = async () => {
        try {
            setLoading(true)
            await dispatch(LoginHandler(email, password, option))
            navigate('/check')
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return (
        <div style={{ width: '25vw', height: '50vh', fontFamily: 'Montserrat', justifyContent: 'center', borderRadius: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)' }} >
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'center', margin: 10, marginTop: 40 }} >
                <div onClick={() => setOption(!option)} style={{ fontFamily: 'Montserrat', border: !option ? '1px solid' : '2px solid', borderColor: !option ? 'black' : '#FF6A3D', display: 'flex', width: '40%', justifyContent: 'center', borderTopLeftRadius: 20, padding: 5, borderBottomLeftRadius: 20 }} >Employer</div>
                <div onClick={() => setOption(!option)} style={{ fontFamily: 'Montserrat', border: !option ? '2px solid' : '1px solid', borderColor: !option ? '#FF6A3D' : 'black', display: 'flex', width: '40%', justifyContent: 'center', borderTopRightRadius: 20, padding: 5, borderBottomRightRadius: 20 }} >Applicant</div>
            </div>
            <div style={{ margin: 20, fontFamily: 'Montserrat', alignSelf: 'center' }}>
                <Input size="middle" onChange={x => setEmail(x.target.value)} placeholder="Username" prefix={<UserOutlined />} style={{ marginBottom: 20 }} />
                <br />
                <Input.Password type={'password'} onChange={x => setPassword(x.target.value)} size="middle" placeholder="Password" prefix={<LockOutlined />} />
            </div>
            <Button loading={loading} onClick={loginhandler} style={{ marginLeft: "2.5vw", width: '80%', alignSelf: 'center', backgroundColor: '#FF6A3D', borderRadius: 10, color: 'white' }} >Login</Button>
            <p style={{ textAlign: 'center', margin: 10 }} >New User? <a onClick={() => setVisible(true)}  >Register Now</a> </p>
            <Modal title={"Register As"} width={300} visible={visible} onCancel={() => setVisible(false)} footer={[
                <Button key="back" onClick={() => setVisible(false)}>
                    Cancel
                </Button>]} bodyStyle={{ backgroundColor: '#1A2238' }}  >
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#1A2238' }} >
                    <Button onClick={() => navigate('/register/Emp')} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Company</Button>
                    <Button onClick={() => navigate('/register/App')} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Applicant</Button>
                </div>
            </Modal>
        </div>
    )
}

export default LoginCard