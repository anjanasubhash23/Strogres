import { Button, Input, Switch } from 'antd'
import React, { useState } from 'react'
import SideDrawer from '../../components/SideDrawer'
import './parserresume.css'
import {
    InboxOutlined
} from "@ant-design/icons";

function ParserResume() {
    const [files, setFiles] = useState()
    const [upload, setUpload] = useState(false)
    console.log(files)
    const uploadData = async () => {
        const response = await fetch("/extracttext", {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                file: files
            })
        })
        const resData = await response.json()
        console.log(resData.data)
        // const response1 = await fetch("/extractData", {
        //     method: "POST",
        //     headers: { "Content-Type": 'application/json' },
        //     body: JSON.stringify({
        //         text:resData.data
        //     })
        // })
        // const resData = await response.json()
    }
    return (
        <SideDrawer>
            <div style={{ height: '100vh', fontFamily: "montserrat", justifyContent: "center", display: 'flex', alignItems: 'center' }} >
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