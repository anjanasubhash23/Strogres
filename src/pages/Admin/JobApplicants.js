import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router";
import { SidePane } from 'react-side-pane';
import SideDrawer from "../../components/SideDrawer";
import './JobApplicant.css'
import FileViewer from 'react-file-viewer';
import { useDispatch, useSelector } from 'react-redux'
import { fetchcount, parseSpecific, updateStatus } from "../../store/action/applicant"
import { toast, ToastContainer } from 'react-toastify';
import { Button, Checkbox, Input, Modal, Popover, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import PopupBox from '../../components/PopupBox';
import app from '../../firebase'
import {
  InfoCircleOutlined
} from "@ant-design/icons";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import TextArea from 'antd/lib/input/TextArea';
import { Helmet } from 'react-helmet';
import { listClasses } from '@mui/material';
import { addRank } from '../../store/action/job';

export default function JobApplicants(props) {
  const newData = []
  const userid = useSelector(x => x.auth.userid)
  const applicant = useSelector(x => x.app.count)
  const [subject, setSubject] = useState("Interview Call")
  const [email, setEmail] = useState()
  const [id, setId] = useState()
  const [visible, setVisible] = useState(false)
  const [mail, setMail] = useState()
  const [name, setName] = useState("")
  const mailBody = `Hello ${name} \nWe have processed your resume and we would like to call you for further rounds \n `
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState()
  const [edit, setEdit] = useState(false)
  const [change, setChange] = useState(false)
  const [datas, setData] = useState()
  const [load, setLoad] = useState()
  const [item, setItem] = useState()
  const [lod, setLod] = useState(false)
  const [appdatas, setAppdata] = useState()
  const [open, setOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState(false)
  const [list, setList] = useState([])
  const [rtype, setRtype] = useState(true)
  const [rank, setRanked] = useState()
  const data = useLocation()
  if (data.state.info.skills.length !== 0) {
    data.state.info.skills.map(x => { newData.push(x.text); return 0; })
  }
  const [option, setOption] = useState(false)
  const dispatch = useDispatch()
  const fetchdata = async () => {
    await dispatch(fetchcount())
  }
  const storageRef = getStorage(app)
  const jd = data.state.info.jobDescription + " " + newData.join(",")
  console.log(jd)
  const parse = async () => {
    setLoad(true)
    console.log(data.state.info.jobDescription)
    // if (files[0].type == "application/zip") {
    //   // const zip = new JSZip();
    //   zip.loadAsync(files[0]).then(data => console.log(data))

    // }
    for (let i = 0; i < files.length; i++) {

      const reff = ref(storageRef, `/Resume/${files[i].name}`);
      await uploadBytesResumable(reff, files[i])
      const url = await getDownloadURL(ref(storageRef, `${'Resume/'}${files[i].name}`))
      console.log(url)
      await dispatch(parseSpecific(data.state.info.id, url, jd))
    }
    setLoad(false)
    setChange(false)

  }

  const sendMail = async () => {
    console.log('sending mail')
    try {
      setLod(true)
      await fetch('/sendMail', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: "prafulponnappan@gmail.com",
          subject: subject,
          body: mailBody
        })
      })
      await dispatch(updateStatus(id, true))
      setLod(false)
      setVisible(false)
      toast.success("EMAIL SENT", {
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
      setVisible(false)
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
  const handleok = value => {
    setEdit(value)
  }
  const handlecancel = value => {
    setEdit(value)
  }
  const update = async (id, mode, appuid, appliedid, i) => {
    setLoad(true)
    console.log("Updating..", appdatas, appdatas[i], appdatas[i].appliedid, i)
    await dispatch(updateStatus(id, false, mode, appdatas[i].appuid, appdatas[i].appliedid))
    setLoad(false)
  }
  let appdata = applicant.filter(x => x.jobid === data.state.info.id)

  const content = (
    <div style={{ fontFamily: "Montserrat" }} >
      <div style={{ display: 'flex' }} >
        <p>Hold: </p>
        <span className="dot" style={{ backgroundColor: '#0677d4', marginLeft: 5, marginTop: 3 }}></span>
      </div>
      <div style={{ display: 'flex' }} >
        <p>Selected: </p>
        <span className="dot" style={{ backgroundColor: '#00cc30', marginLeft: 5, marginTop: 3 }}></span>
      </div>
      <div style={{ display: 'flex' }} >
        <p>Rejected: </p>
        <span className="dot" style={{ backgroundColor: '#ff4f4f', marginLeft: 5, marginTop: 3 }}></span>
      </div>
      <div style={{ display: 'flex' }} >
        <p>Interview: </p>
        <span className="dot" style={{ backgroundColor: '#bbb', marginLeft: 5, marginTop: 3 }}></span>
      </div>
    </div>
  )
  const content1 = (
    <div>
      <p>Upload resume in bulk</p>
    </div>
  )
  const options = [
    { label: 'Selected', value: "Selected" },
    { label: 'Hold', value: "Hold" },
    { label: 'Rejected', value: "Rejected" },
    { label: 'Email not Sent', value: "Email not Sent" },
  ];
  const onFilter = () => {
    setOpen(false)
    console.log(item)
    let lists = []
    for (const data in item) {
      console.log(item[data], applicant.filter(x => x.status === item[data]))
      let d;
      if (item[data] === "Email not Sent") {
        d = applicant.filter(x => x.estatus === false)
      }
      else {
        d = applicant.filter(x => x.status === item[data])
      }
      const c = lists.concat(d)
      lists = c
      console.log(c)
      setList(c)
    }

  }
  const ranked = async () => {
    if (data.state.info.rank === undefined) {
      setRanked(appdata.sort((a, b) => b.scores > a.scores ? 1 : -1))
      if (appdata.length >= data.state.info.noOpening) {
        await dispatch(addRank(data.state.info.id, data.state.info.count, [rank]))
      }
    }
    else {
      setRanked(data.state.info.rank)
    }
  }
  useEffect(() => {
    setLoading(true)
    console.log("hello")
    fetchdata()
    setAppdata(applicant.filter(x => x.jobid === data.state.info.id))
    setList([])
    ranked()
    setLoading(false)
  }, [])
  console.log(appdata, list, list.length)
  if (loading) {
    return (
      <SideDrawer>
        <div style={{ position: 'absolute', top: '50%', left: '55%', textAlign: 'center' }} >
          <Spin size='large' style={{ color: '#FF6A3D' }} />
        </div>
      </SideDrawer>
    )
  }
  return (
    <SideDrawer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Job-{data.state.info.jobPost}</title>
      </Helmet>
      <ToastContainer />
      <Modal style={{ fontFamily: "Montserrat" }} title="Filter By" visible={open} onCancel={() => setOpen(false)} footer={[<Button onClick={onFilter} style={{ borderRadius: 10, fontFamily: "Montserrat", backgroundColor: '#FF6A3D', margin: 5, color: 'white' }}  >Apply</Button>]} >
        <Checkbox.Group options={options} defaultValue={['Selected']} onChange={x => setItem(x)} />
      </Modal>
      <Modal footer={[
        <Button onClick={sendMail} loading={lod} style={{ borderRadius: 10, fontFamily: "Montserrat", backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Send Mail</Button>
      ]} visible={visible} title={<h3 style={{ fontSize: 15, fontFamily: 'Montserrat' }} >Mail Body</h3>} onCancel={() => setVisible(false)} >
        <div style={{ margin: 8 }} >
          <label style={{ fontSize: 15, fontFamily: 'Montserrat' }}>Sender Email Id</label>
          <Input value={email} unselectable />
        </div>
        <div style={{ margin: 8 }} >
          <label style={{ fontSize: 15, fontFamily: 'Montserrat' }}>Email Subject</label>
          <Input value={subject} onChange={(x) => setSubject(x.target.value)} />
        </div>
        <div style={{ margin: 8 }} >
          <label style={{ fontSize: 15, fontFamily: 'Montserrat' }} >Email Body</label>
          <TextArea rows={6} value={mailBody} onChange={(x) => setMail(x.target.value)} />
        </div>
      </Modal>
      <div className="JobApplicants scroll" style={{ fontFamily: 'Montserrat' }} >
        <div className="app-subContainer">

          <div style={{ display: "flex" }} >
            <h1 style={{ fontSize: 25 }} >{data.state.info.jobPost}</h1>
            <EditOutlined onClick={() => setEdit(!edit)} style={{ textAlign: 'center', marginLeft: 10, marginTop: 8 }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
              <p>Time: {data.state.info.mode === 0 ? "Full Time" : "Part Time"}</p>
              <p>Mode: {data.state.info.type === 0 ? "WFH" : "On-Site"}</p>
              {data.state.info.type === 1 ? <p>Location: {data.state.info.city}</p> : null}
              <p>Last Date to Apply: {data.state.info.lastdate}</p>
            </div>
            <p>Job Description: {data.state.info.jobDescription}</p>
            <p>Skills Required: {data.state.info.skills.length !== 0 ? newData.join(" , ") : ""} </p>
            <p>No of Opening: {data.state.info.noOpening}</p>
          </div>
          <PopupBox visible={edit} editable={true} data={data.state.info} handleok={handleok} handlecancel={handlecancel} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <div style={{ display: 'flex' }} >
              <Popover content={content1} ><Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={() => setChange(true)} >Add Resume</Button></Popover>
              {change ? <div style={{ display: 'flex', padding: 8 }}>
                <input type={'file'} onChange={x => setFiles(x.target.files)} multiple={true} />
                {files ? <Button loading={load} onClick={parse} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Parse</Button> : null}
              </div> : null}
            </div>
            {appdata.length !== 0 ? <div style={{ display: 'flex' }} >
              <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={() => setRtype(true)}   >Rank Resumes</Button>
              <Button style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={() => setRtype(false)}>All Resumes</Button>
              <Button onClick={() => setOpen(true)} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Filter Resume</Button>
            </div> : null}

          </div>
          <div className='app-tableContainer'>
            <h1>Applicants</h1>
            {list.length !== 0 ? <table className='app-table'>
              <tr>
                <th>Name</th>
                <th>Decision</th>
                <th>Status <Popover style={{ fontFamily: 'Montserrat' }} content={content} trigger="hover" title="Status Color Info" ><InfoCircleOutlined /></Popover> </th>
              </tr>
              {list.filter(x => x.jobid === data.state.info.id).map((x, index) => {
                console.log(list)
                return (
                  <tr>

                    <td onClick={function () { setOpenPanel(true); setData(x); }}>{x.parsedata.NAME}</td>
                    <td>{!x.estatus ? <Button disabled={load} className='app-button-email' onClick={() => { setVisible(true); setEmail(x.parsedata.EMAIL); setName(x.parsedata.NAME); setId(x.id) }}>Send Email</Button>
                      :
                      <div className='app-button-container'>
                        <Button disabled={load} className='app-button-accept' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Selected", x.appuid, x.appliedid, index) }}  >Accept</Button>
                        <Button disabled={load} className='app-button-hold' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Hold", x.appuid, x.appliedid, index) }}>Hold</Button>
                        <Button disabled={load} className='app-button-reject' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Rejected", x.appuid, x.appliedid, index) }} >Reject</Button>
                      </div>}
                    </td>
                    <td>
                      {x.status === "Hold" ? <span className="dot" style={{ backgroundColor: '#0677d4' }}></span>
                        :
                        x.status === "Selected" ? <span className="dot" style={{ backgroundColor: '#00cc30' }}></span>
                          :
                          x.status === "Rejected" ? <span className="dot" style={{ backgroundColor: '#ff4f4f' }}></span>
                            :
                            <span className="dot" style={{ backgroundColor: '#bbb' }}></span>}
                    </td>
                  </tr>
                );
              })}
            </table> : rtype ? appdata.length !== 0 ? <table className='app-table'>
              <tr>
                <th>Name</th>
                <th>Decision</th>
                <th>Status <Popover content={content} trigger="hover" title="Status Color Info" ><InfoCircleOutlined /></Popover> </th>
              </tr>
              {appdata.sort((a, b) => b.scores > a.scores ? 1 : -1).slice(0, data.state.info.noOpening).map((x, index) => {
                console.log(appdata)
                return (
                  <tr>

                    <td onClick={function () { setOpenPanel(true); setData(x); }}>{x.parsedata.NAME}</td>
                    <td>{!x.estatus ? <Button disabled={load} className='app-button-email' onClick={() => { setVisible(true); setEmail(x.parsedata.EMAIL); setName(x.parsedata.NAME); setId(x.id) }}>Send Email</Button>
                      :
                      <div className='app-button-container'>
                        <Button disabled={load} className='app-button-accept' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Selected", x.appuid, x.appliedid, index) }}  >Accept</Button>
                        <Button disabled={load} className='app-button-hold' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Hold", x.appuid, x.appliedid, index) }}>Hold</Button>
                        <Button disabled={load} className='app-button-reject' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Rejected", x.appuid, x.appliedid, index) }} >Reject</Button>
                      </div>}
                    </td>
                    <td>
                      {x.status === "Hold" ? <span className="dot" style={{ backgroundColor: '#0677d4' }}></span>
                        :
                        x.status === "Selected" ? <span className="dot" style={{ backgroundColor: '#00cc30' }}></span>
                          :
                          x.status === "Rejected" ? <span className="dot" style={{ backgroundColor: '#ff4f4f' }}></span>
                            :
                            <span className="dot" style={{ backgroundColor: '#bbb' }}></span>}
                    </td>
                  </tr>
                );
              })}
            </table> : <div style={{ display: 'flex', justifyContent: 'center' }} >
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginTop: 30 }} >No Application Received Yet</h2>
            </div> : !rtype ? appdata.length !== 0 ? <table className='app-table'>
              <tr>
                <th>Name</th>
                <th>Decision</th>
                <th>Status <Popover content={content} trigger="hover" title="Status Color Info" ><InfoCircleOutlined /></Popover> </th>
              </tr>
              {appdata.map((x, index) => {
                console.log(appdata)
                return (
                  <tr>

                    <td onClick={function () { setOpenPanel(true); setData(x); }}>{x.parsedata.NAME}</td>
                    <td>{!x.estatus ? <Button disabled={load} className='app-button-email' onClick={() => { setVisible(true); setEmail(x.parsedata.EMAIL); setName(x.parsedata.NAME); setId(x.id) }}>Send Email</Button>
                      :
                      <div className='app-button-container'>
                        <Button disabled={load} className='app-button-accept' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Selected", x.appuid, x.appliedid, index) }}  >Accept</Button>
                        <Button disabled={load} className='app-button-hold' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Hold", x.appuid, x.appliedid, index) }}>Hold</Button>
                        <Button disabled={load} className='app-button-reject' onClick={(e) => { console.log(x, index, x.appuid, x.appliedid); e.preventDefault(); update(x.id, "Rejected", x.appuid, x.appliedid, index) }} >Reject</Button>
                      </div>}
                    </td>
                    <td>
                      {x.status === "Hold" ? <span className="dot" style={{ backgroundColor: '#0677d4' }}></span>
                        :
                        x.status === "Selected" ? <span className="dot" style={{ backgroundColor: '#00cc30' }}></span>
                          :
                          x.status === "Rejected" ? <span className="dot" style={{ backgroundColor: '#ff4f4f' }}></span>
                            :
                            <span className="dot" style={{ backgroundColor: '#bbb' }}></span>}
                    </td>
                  </tr>
                );
              })}
            </table> : <div style={{ display: 'flex', justifyContent: 'center' }} >
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginTop: 30 }} >No Application Received Yet</h2>
            </div> : <div style={{ display: 'flex', justifyContent: 'center' }} >
              <h2 style={{ fontFamily: 'Montserrat', fontWeight: 'bold', marginTop: 30 }} >No Application Received Yet</h2>
            </div>}
          </div>



          <SidePane open={openPanel} width={50} onClose={() => setOpenPanel(false)}>
            {datas ? <div style={{ fontFamily: "Montserrat" }} >
              <div style={{ backgroundColor: '#F0ECEC', display: 'flex', justifyContent: 'space-between', height: "20vh", padding: 20 }} >
                <div>
                  <h1>{datas.parsedata.NAME}</h1>
                  <p style={{ padding: 0, margin: 0 }} >{datas.parsedata.EMAIL}</p>
                  <p style={{ padding: 0, margin: 0 }} >{datas.parsedata.MOBILE_NUMBER}</p>
                </div>
                <Button onClick={() => setVisible(true)} style={{ borderRadius: 10, marginTop: 20, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Send Mail</Button>
              </div>
              <div style={{ display: 'flex' }} >
                <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? '#FFFFFF' : 'black', backgroundColor: !option ? '#FF6A3D' : 'grey', padding: 8 }} >Details</div>
                <div onClick={() => { window.open(datas.url, '_blank') }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? 'black' : '#ffffff', backgroundColor: !option ? 'grey' : '#FF6A3D', padding: 8 }} >Resume</div>
              </div>
              <div className='scroll' style={{ backgroundColor: '#F8F3EF', height: '70vh' }} >
                <div style={{ padding: 10 }} >
                  <h2>Education</h2>
                  <ul>
                    {datas.parsedata.EDUCATION === "" ? null : datas.parsedata.EDUCATION.map(x => {
                      return (
                        <li>{x}</li>
                      )
                    })}
                  </ul>
                </div>
                <div style={{ padding: 10 }} >
                  <h2>Experience</h2>
                  <ul>
                    {datas.parsedata.EXPERIENCE === "" ? null : datas.parsedata.EXPERIENCE.map(x => {
                      return (
                        <li>{x}</li>
                      )
                    })}
                  </ul>
                </div>
                <div style={{ padding: 10 }} >
                  <h2>Skills</h2>
                  <ul>
                    {datas.parsedata.SKILLS.map(x => {
                      return (
                        <li>{x}</li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div> : null}
          </SidePane>
        </div>

      </div>
    </SideDrawer>
  );
}
