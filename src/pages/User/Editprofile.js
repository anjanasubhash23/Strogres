import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { ApplicantData } from '../../store/action/auth'
import TopNavBar from './TopNavBar'
import app from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { updateInfo } from '../../store/action/applicant'
import { toast, ToastContainer } from 'react-toastify'

function Editprofile() {
    const data = useLocation()
    const userdata = data.state
    console.log(data, userdata)
    const [firstName, setfirstName] = useState(userdata.name)
    const [email, setEmail] = useState(userdata.email)
    const [lastName, setlastName] = useState(userdata.lastname)
    const [job1, setjob1] = useState(userdata.job[0])
    const [job2, setjob2] = useState(userdata.job[1])
    const [city1, setcity1] = useState(userdata.city[0])
    const [city2, setcity2] = useState(userdata.city[1])
    const [job, setJob] = useState(userdata.job)
    const [city, setCity] = useState(userdata.city)
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const storageRef = getStorage(app)
    const dispatch = useDispatch()
    const editprofile = async () => {
        setLoading(true)
        setJob([job1, job2])
        setCity([city1, city2])
        if (file) {
            const ref1 = ref(storageRef, `/Resume/${userdata.name}`);
            deleteObject(ref1)
            const reff = ref(storageRef, `/Resume/${userdata.name}`);
            await uploadBytesResumable(reff, file[0])
            const url = await getDownloadURL(ref(storageRef, `${'Resume/'}${userdata.name}`))
            console.log(url)
            await dispatch(updateInfo(userdata.id, firstName, lastName, url, email, city, job))
        }
        else {
            await dispatch(updateInfo(userdata.id, firstName, lastName, userdata.url, email, city, job))
        }
        setLoading(false)
        toast.success("Profile Edited Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    // useEffect(() => {
    //     const fetchdata = async () => {
    //         await dispatch(ApplicantData())
    //     }
    //     fetchdata()
    // }, [])
    return (
        <TopNavBar>
            <ToastContainer />
            <div className='Explore' style={{ fontFamily: 'Montserrat' }} >
                <h3 style={{ marginTop: 30 }} >Edit Profile Info</h3>
                <div style={{ margin: 10 }} >
                    <label>Name</label>
                    <div style={{ display: 'flex' }} >
                        <div>
                            <label>Firstname</label>
                            <Input value={firstName} onChange={x => setfirstName(x.target.value)} />
                        </div>
                        <div>
                            <label style={{ marginLeft: 10 }} >Lastname</label>
                            <Input value={lastName} onChange={x => setlastName(x.target.value)} style={{ marginLeft: 10 }} />
                        </div>
                    </div>
                </div>
                <div style={{ margin: 10 }} >
                    <label>Email</label>
                    <Input value={email} onChange={x => setEmail(x.target.value)} />
                </div>
                <div style={{ margin: 10 }} >
                    <label>Job Preference</label>
                    <div style={{ display: 'flex' }} >
                        <Input value={job1} onChange={x => setjob1(x.target.value)} />
                        <Input value={job2} onChange={x => setjob2(x.target.value)} style={{ marginLeft: 10 }} />
                    </div>
                </div>
                <div style={{ margin: 10 }} >
                    <label>City Preference</label>
                    <div style={{ display: 'flex' }} >
                        <Input value={city1} onChange={x => setcity1(x.target.value)} />
                        <Input value={city2} onChange={x => setcity2(x.target.value)} style={{ marginLeft: 10 }} />
                    </div>
                </div>
                <div style={{ margin: 10 }} >
                    <label>Resume</label>
                    <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={() => { window.open(userdata.url, '_blank') }} >Click here to view current Resume</Button>
                    <input type={'file'} onChange={x => setFile(x.target.files)} multiple={false} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }} >
                    <Button loading={loading} onClick={editprofile} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Edit Profile</Button>
                </div>
            </div>
        </TopNavBar>
    )
}

export default Editprofile