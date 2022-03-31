import React, { useState } from 'react'
import { Button, Input, Spin, Switch } from "antd";
import TopNavBar from "./TopNavBar";
import { InboxOutlined } from "@ant-design/icons";
import app from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { applyData } from '../../store/action/applicant';


export default function ResumeUploader() {
  const userdata = useSelector(x => x.auth.userData)
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState()
  const navigate = useNavigate()
  const storageRef = getStorage(app)
  const data = useLocation()
  const d = data.state
  const dispatch = useDispatch()
  const uploadFile = async () => {
    const ref1 = ref(storageRef, `/Resume/${userdata.name}`);
    deleteObject(ref1)
    const reff = ref(storageRef, `/Resume/${userdata.name}`);
    await uploadBytesResumable(reff, files[0])
    const url = await getDownloadURL(ref(storageRef, `${'Resume/'}${userdata.name}`))
    setUrl(url)

  }
  const apply = async () => {
    setLoading(true)
    await dispatch(applyData(d.cid, d.jid, d.post, d.cname, d.type, new Date().toLocaleDateString(), true, url, userdata.id))
    setLoading(false)
    navigate("/user/dashboard")
  }
  return (
    <TopNavBar>
      <div style={{ height: '90vh', width: '100%', backgroundColor: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
        <div style={{ textAlign: 'center' }} >
          <InboxOutlined style={{ fontSize: 50 }} />
          <div style={{ textAlign: 'center' }} >
            <h2>Upload Resume</h2>


            <div style={{ paddingLeft: "10vw" }}>
              <input type={'file'} onChange={x => setFiles(x.target.files)} />
            </div>
          </div>
          <div style={{ margin: 10 }} >
            {files === undefined || files.length === 0 ? null : <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={uploadFile} >Upload Resume</Button>}
          </div>
          <div style={{ margin: 10 }} >
            {url ? <div>
              <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={() => { window.open(url, '_blank') }} >Click here to View Resume</Button>
            </div> : null}
          </div>
          {url ? <div>
            <p style={{ margin: 5 }} >Click Here to Apply for the Job</p>
            <Button onClick={apply} loading={loading} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Apply</Button>
          </div> : null}
        </div>

      </div>
    </TopNavBar>
  );
}
