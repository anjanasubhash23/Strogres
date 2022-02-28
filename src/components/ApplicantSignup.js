import { Button, Input, Tabs } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import background from '../img/bg2.png'
import { registerApplicant } from '../store/action/auth'
import app from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'



function ApplicantSignup() {
    const [firstName, setfirstName] = useState("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [lastName, setlastName] = useState()
    const [job, setJob] = useState([])
    const [city, setCity] = useState([])
    const [file, setFile] = useState()
    const [activeKey, setactiveKey] = useState("1")
    const [loading, setLoading] = useState(false)
    // const [url, setUrl] = useState()
    const [job1, setjob1] = useState()
    const [job2, setjob2] = useState()
    const [city1, setcity1] = useState()
    const [city2, setcity2] = useState()
    const dispatch = useDispatch()
    const storageRef = getStorage(app)
    const handleData = async () => {
        try {
            setLoading(true)
            const reff = ref(storageRef, `/Resume/${firstName}`);
            await uploadBytesResumable(reff, file)
            const url = await getDownloadURL(ref(storageRef, `${'Resume/'}${firstName}`))
            console.log(url)
            await dispatch(registerApplicant(email, password, firstName, lastName, city, job, url))
            setLoading(false)
            toast.success("Account created Successfully.Please goto Login Page", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        catch (err) {
            console.log(err.message)
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setLoading(false)
        }
    }
    function callback(key) {
        setactiveKey(key)
    }
    return (
        <div style={{ fontFamily: "Montserrat", display: 'flex' }} >
            <ToastContainer />
            <div style={{ width: '50vw', height: '100vh', backgroundColor: '#1A2238', padding: '7vw' }} >
                <img src={background} alt="img" style={{ width: 400, height: 350 }} />
                <p style={{ color: 'white', marginTop: 20, fontSize: 16 }} >Explore the Different Job Opening
                    based on your preference and apply
                    for your dream Job
                </p>
            </div>
            <div style={{ width: '50vw', height: '100vh', backgroundColor: '#f7f8f9', padding: '5vw' }}>
                <div>
                    <h3 style={{ margin: 0, padding: 0 }}>Sign Up as</h3>
                    <h3 style={{ margin: 0, padding: 0, color: '#FF6A3D', fontFamily: 30 }}>an Applicant</h3>
                </div>
                <Tabs defaultActiveKey="1" tabBarGutter={40} onChange={callback} tabBarStyle={{
                    alignSelf: 'center'
                }} activeKey={activeKey}  >
                    <Tabs.TabPane tab="1" key="1">
                        <form  >
                            <div style={{ marginTop: 30 }} >
                                <label>Name</label>
                                <div style={{ display: 'flex' }} >
                                    <Input onChange={x => setfirstName(x.target.value)} style={{ width: '40%' }} placeholder="First Name" />
                                    <Input onChange={x => setlastName(x.target.value)} style={{ width: '40%', marginLeft: 20 }} placeholder="Last Name" />
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <label>Email</label>
                                <Input type={'email'} onChange={x => setEmail(x.target.value)} />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <label>Password</label>
                                <Input type={'password'} onChange={x => setPassword(x.target.value)} />
                            </div>

                            <Button onClick={() => callback("2")} style={{ position: 'fixed', right: '5vw', borderRadius: 20, marginTop: 20, backgroundColor: '#FF6A3D', color: 'white' }}>Next</Button>
                        </form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="2" key="2" >
                        <form>
                            <div style={{ marginTop: 30 }} >
                                <label>Job Preference</label>
                                <div style={{ display: 'flex' }} >
                                    <Input onChange={x => setjob1(x.target.value)} style={{ width: '40%' }} placeholder="First" />
                                    <Input onChange={x => setjob2(x.target.value)} style={{ width: '40%', marginLeft: 20 }} placeholder="Second" />

                                </div>
                            </div>
                            <div style={{ marginTop: 30 }} >
                                <label>City Pereference</label>
                                <div style={{ display: 'flex' }} >
                                    <Input onChange={x => setcity1(x.target.value)} style={{ width: '40%' }} placeholder="First " />
                                    <Input onChange={x => setcity2(x.target.value)} style={{ width: '40%', marginLeft: 20 }} placeholder="Second " />
                                </div>
                            </div>
                            <Button onClick={() => callback("1")} style={{ position: 'fixed', left: '55vw', borderRadius: 20, marginTop: 20, backgroundColor: '#FF6A3D', color: 'white' }}>Previous</Button>
                            <Button onClick={() => { callback("3"); setJob([job1, job2]); setCity([city1, city2]) }} style={{ position: 'fixed', right: '5vw', borderRadius: 20, marginTop: 20, backgroundColor: '#FF6A3D', color: 'white' }}>Next</Button>
                        </form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="3" key="3">
                        <form>
                            <label>Upload Resume</label>
                            <Input onChange={x => { setFile(x.target.files[0]); console.log(x.target.files) }} type={'file'} />
                            <p style={{ marginTop: 20 }} >Note: Whenever you apply to a job, this is the
                                resume that the employer will see.
                                Always make sure it is up to date.</p>
                        </form>
                        <Button onClick={() => callback("2")} style={{ position: 'fixed', left: '55vw', borderRadius: 20, marginTop: 20, backgroundColor: '#FF6A3D', color: 'white' }}>Previous</Button>
                        <Button onClick={handleData} loading={loading} style={{ position: 'fixed', right: '5vw', borderRadius: 20, marginTop: 20, backgroundColor: '#FF6A3D', color: 'white' }}>Submit</Button>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default ApplicantSignup