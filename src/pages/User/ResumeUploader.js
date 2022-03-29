import React, { useState } from 'react'
import { Button, Input, Spin, Switch } from "antd";
import TopNavBar from "./TopNavBar";
import { InboxOutlined } from "@ant-design/icons";
export default function ResumeUploader() {
  const[files,setFiles] = useState()
  const [loading, setLoading] = useState(false);
  let test_link =
    "https://firebasestorage.googleapis.com/v0/b/resume-parser-bf8d9.appspot.com/o/Resume%2Fresume.pdf?alt=media&token=2fa47ed6-b41a-4ae3-aa0e-230f2a331371";
  const uploadFile = () => {
    console.log("ha")
    window.open(test_link);
  }
  return (
    <TopNavBar>
      <div style={{ height: '90vh', width: '100%', backgroundColor: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center' ,alignSelf:'center'}} >
                        <div style={{ textAlign: 'center' }} >
                            <InboxOutlined style={{ fontSize: 50 }} />
                            <div style={{ textAlign: 'center' }} >
                                <h2>Upload Resume</h2>
                                
                                
                                <div style={{ paddingLeft: "10vw" }}>
                                    <input type={'file'} onChange={x => setFiles(x.target.files)} />
                                </div>
                            </div>
                            <div style={{ margin: 10 }} >
                                {files === undefined || files.length === 0 ? null : <Button loading={loading} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={uploadFile} >Parse</Button>}
                            </div>
                        </div>

                    </div>
    </TopNavBar>
  );
}
