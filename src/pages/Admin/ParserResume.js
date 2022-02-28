import { Button, Input, Spin, Switch } from 'antd'
import React, { useState } from 'react'
import SideDrawer from '../../components/SideDrawer'
import './parserresume.css'
import { InboxOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from 'react-toastify';
import app from '../../firebase'
import { useDispatch } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { parseResume } from '../../store/action/job';

function ParserResume() {
    const [files, setFiles] = useState()
    const [upload, setUpload] = useState(false)
    const [loading, setLoading] = useState(false)
    const storageRef = getStorage(app)
    const dispatch = useDispatch()
    const extractdata = async (url) => {
        const response = await fetch('/extract', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: url
            })
        })
        const resData = await response.json()
        console.log(resData)
    }
    const uploadData = async () => {
        try {
            setLoading(true)
            if (upload) {
                console.log(files)
            }
            else {
                const reff = ref(storageRef, `/Resume/${files[0].name}`);
                await uploadBytesResumable(reff, files[0])
                const url = await getDownloadURL(ref(storageRef, `${'Resume/'}${files[0].name}`))
                //await extractdata(url)
                await dispatch(parseResume(url))
            }
            setLoading(false)
            toast.success("File Uploaded", {
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

                <div style={{ height: '80vh', width: '70vw', backgroundColor: '#F8F3EF', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
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
                            {files === undefined || files.length === 0 ? null : <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={uploadData} >Parse</Button>}
                        </div>
                    </div>

                </div>
            </div>
        </SideDrawer>
    )
}

export default ParserResume