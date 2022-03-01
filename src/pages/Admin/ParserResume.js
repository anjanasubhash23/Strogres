import { Button, Input, Spin, Switch } from 'antd'
import React, { useState } from 'react'
import SideDrawer from '../../components/SideDrawer'
import './parserresume.css'
import { InboxOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from 'react-toastify';
import app from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { parseResume } from '../../store/action/applicant';
import ParseDetails from '../../components/ParseDetails';

function ParserResume() {
    const parsedata = useSelector(x => x.app.parseData)
    const [files, setFiles] = useState()
    const [upload, setUpload] = useState(false)
    const [loading, setLoading] = useState(false)
    const [change, setChange] = useState(false)
    const storageRef = getStorage(app)
    const dispatch = useDispatch()
    const onchange = (p) => {
        setChange(p)
    }
    const uploadData = async () => {
        try {
            setLoading(true)
            if (upload) {
                console.log(files)
            }
            else {
                console.log("uploading......")
                const reff = ref(storageRef, `/Resume/${files[0].name}`);
                await uploadBytesResumable(reff, files[0])
                const url = await getDownloadURL(ref(storageRef, `${'Resume/'}${files[0].name}`))
                console.log(url)
                await dispatch(parseResume(url))
                setChange(true)
            }
            setLoading(false)
        }
        catch (err) {
            toast.error(err.messsage, {
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
        <SideDrawer>
            <div style={{ height: '100vh', fontFamily: "montserrat", justifyContent: "center", display: 'flex', alignItems: 'center' }} >
                <ToastContainer />

                {change ?
                    <ParseDetails parsedata={parsedata} onchange={onchange} />
                    : <div style={{ height: '80vh', width: '70vw', backgroundColor: '#F8F3EF', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ textAlign: 'center' }} >
                            <InboxOutlined style={{ fontSize: 50 }} />
                            <div style={{ textAlign: 'center' }} >
                                <h2>Upload Resume</h2>
                                <Switch style={{ justifyContent: 'center', margin: 10 }} onChange={() => setUpload(!upload)} />
                                <p> {upload ? "Bulk" : "Single File"} Upload Activate</p>
                                <div style={{ paddingLeft: "10vw" }}>
                                    <input type={'file'} onChange={x => setFiles(x.target.files)} multiple={upload} />
                                </div>
                            </div>
                            <div style={{ margin: 10 }} >
                                {files === undefined || files.length === 0 ? null : <Button loading={loading} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={uploadData} >Parse</Button>}
                            </div>
                        </div>

                    </div>}
            </div>
        </SideDrawer>
    )
}

export default ParserResume