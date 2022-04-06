import { Button, Form, Input } from 'antd'
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
            console.log(err)
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
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            loginhandler();
        }
    };
    return (
        <div style={{ width: '25vw', height: '50vh', fontFamily: 'Montserrat', justifyContent: 'center', borderRadius: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)' }} >
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'center', margin: 10, marginTop: 40 }} >
                <div onClick={() => setOption(!option)} style={{ fontFamily: 'Montserrat', border: !option ? '1px solid' : '2px solid', borderColor: !option ? 'black' : '#FF6A3D', display: 'flex', width: '40%', justifyContent: 'center', borderTopLeftRadius: 20, padding: 5, borderBottomLeftRadius: 20 }} >Employer</div>
                <div onClick={() => setOption(!option)} style={{ fontFamily: 'Montserrat', border: !option ? '2px solid' : '1px solid', borderColor: !option ? '#FF6A3D' : 'black', display: 'flex', width: '40%', justifyContent: 'center', borderTopRightRadius: 20, padding: 5, borderBottomRightRadius: 20 }} >Applicant</div>
            </div>
            <Form>
                <div style={{ margin: 20, fontFamily: 'Montserrat', alignSelf: 'center' }}>
                    <Form.Item  >
                        <Input size="middle" onChange={x => setEmail(x.target.value)} placeholder="Username" prefix={<UserOutlined />} style={{ marginTop: 20 }} />
                    </Form.Item>
                    <Form.Item>
                        <Input.Password type={'password'} onChange={x => setPassword(x.target.value)} size="middle" placeholder="Password" prefix={<LockOutlined />} />
                    </Form.Item>
                </div>
                <Button loading={loading} onKeyPress={handleKeypress} onClick={loginhandler} style={{ marginLeft: "2.5vw", width: '80%', alignSelf: 'center', backgroundColor: '#FF6A3D', borderRadius: 10, color: 'white' }} >Login</Button>
            </Form>
            <p style={{ textAlign: 'center', margin: 10 }} >New User? <a onClick={() => setVisible(true)}  >Register Now</a> </p>
            <Modal title={"Who are You"} width={300} visible={visible} onCancel={() => setVisible(false)} footer={[
                <Button key="back" onClick={() => setVisible(false)}>
                    Cancel
                </Button>]}  >
                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <Button onClick={() => navigate('/register/Emp')} style={{ borderRadius: 10, fontFamily: 'Montserrat', backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Company</Button>
                    <Button onClick={() => navigate('/register/App')} style={{ borderRadius: 10, fontFamily: 'Montserrat', backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Applicant</Button>
                </div>
            </Modal>
        </div>
    )
}

export default LoginCard