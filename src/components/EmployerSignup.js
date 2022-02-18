import { Button, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RegisterCompany } from '../store/action/auth'
import background from '../img/bg.png'
import { toast, ToastContainer } from 'react-toastify'

function EmployerSignup() {
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [hrname, setHrname] = useState()
    const [about, setAbout] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleData = async () => {
        try {
            setLoading(true)
            await dispatch(RegisterCompany(company, email, password, hrname, about))
            setLoading(false)
        }
        catch (err) {
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
        <div style={{ fontFamily: "Montserrat", display: 'flex' }} >
            <ToastContainer />
            <div style={{ width: '50vw', height: '100vh', backgroundColor: '#1A2238', padding: '7vw' }} >
                <img src={background} alt="img" style={{ width: 400, height: 350 }} />
                <p style={{ color: 'white', marginTop: 20, fontSize: 16 }} >Select the best candidate
                    with the help of our parser and
                    hire the potential candidate for the
                    specific Role</p>
            </div>
            <div style={{ width: '50vw', height: '100vh', backgroundColor: '#f7f8f9', padding: '5vw' }}>
                <form  >
                    <div>
                        <h3 style={{ margin: 0, padding: 0 }}>Sign Up as</h3>
                        <h3 style={{ margin: 0, padding: 0, color: '#FF6A3D', fontFamily: 30 }}>an Employer</h3>
                    </div>
                    <div style={{ marginTop: 30 }} >
                        <label>Company Name</label>
                        <Input onChange={x => setCompany(x.target.value)} required />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <label>Email</label>
                        <Input onChange={x => setEmail(x.target.value)} type={'email'} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <label>Password</label>
                        <Input type={'password'} onChange={x => setPassword(x.target.value)} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <label>Hr-Name (or the employee who gonna handle the app)</label>
                        <Input onChange={x => setHrname(x.target.value)} />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <label>About Company (To give brief idea to applicant)</label>
                        <TextArea onChange={x => setAbout(x.target.value)} />
                    </div>
                    <Button onClick={handleData} loading={loading} style={{ position: 'fixed', right: '5vw', borderRadius: 20, marginTop: 20, backgroundColor: '#FF6A3D', color: 'white' }}>Submit</Button>
                </form>
            </div>
        </div >
    )
}

export default EmployerSignup