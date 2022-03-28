import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router";
import { SidePane } from 'react-side-pane';
import SideDrawer from "../../components/SideDrawer";
import './JobApplicant.css'
import FileViewer from 'react-file-viewer';
import { useDispatch, useSelector } from 'react-redux'
import { fetchcount } from "../../store/action/applicant"
import { toast } from 'react-toastify';
import { Button } from 'antd';

export default function JobApplicants(props) {
  const newData = []
  const applicant = useSelector(x => x.app.count)
  const [loading, setLoading] = useState(false)
  const [datas, setData] = useState()
  const [openPanel, setOpenPanel] = useState(false)
  const data = useLocation()
  if (data.state.info.skills.length !== 0) {
    data.state.info.skills.map(x => { newData.push(x.text); return 0; })
  }
  const [option, setOption] = useState(false)
  const dispatch = useDispatch()
  const fetchdata = async () => {
    await dispatch(fetchcount())
  }
  console.log(openPanel)
  const sendMail = async () => {
    try {
      setLoading(true)
      await fetch('/sendMail', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: data.parsedata["EMAIL ADDRESS"]
        })
      })
      setLoading(false)
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
  useEffect(() => {
    fetchdata()
  }, [])
  const appdata = applicant.filter(x => x.jobid === data.state.info.id)
  console.log(appdata, data.state.info, applicant)
  return (
    <SideDrawer>
      <div className="JobApplicants" style={{ fontFamily: 'Montserrat' }} >
        <div className="job-subContainer">

          <h1 style={{ fontSize: 25 }} >{data.state.info.jobPost}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <p>Time: {data.state.info.mode === 0 ? "Full Time" : "Part Time"}</p>
            <p>Mode: {data.state.info.type === 0 ? "WFH" : "On-Site"}</p>
            {data.state.info.type === 1 ? <p>Location: {data.state.info.city}</p> : null}
            <p>Last Date to Apply: {data.state.info.lastdate}</p>
          </div>
          <p>Job Description: {data.state.info.jobDescription}</p>
          <p>Skills Required: {data.state.info.skills.length !== 0 ? newData.join(" , ") : ""} </p>
          <div className="job-tableContainer">
            {appdata ? <table className='job-table'>
              {appdata.map(x => {
                return (
                  <tr>
                    <td>{x.parsedata.NAME}</td>
                    <div style={{ padding: 20, border: "1px solid #ddd" }} ><a onClick={function () { setOpenPanel(true); setData(x); }}  ><td  >View Details</td></a></div>
                    <td>Remove</td>
                    <td>Send Mail</td>
                  </tr>
                )
              })}
            </table> : <div style={{ postion: 'absolute', top: '50%', left: '50%' }} >
              <h2>No Application Received Yet</h2>
            </div>}
          </div>
          <SidePane open={openPanel} width={50} onClose={() => setOpenPanel(false)}>
            {datas ? <div style={{ fontFamily: "Montserrat" }} >
              <div style={{ backgroundColor: '#F0ECEC', display: 'flex', justifyContent: 'space-between', height: "20vh", padding: 20 }} >
                <div>
                  <h1>{datas.parsedata.NAME}</h1>
                  <p style={{ padding: 0, margin: 0 }} >{datas.parsedata.DESIGNATION[0]}</p>
                  <p style={{ padding: 0, margin: 0 }} >{datas.parsedata.EMAIL}</p>
                  <p style={{ padding: 0, margin: 0 }} >{datas.parsedata.MOBILE_NUMBER}</p>
                </div>
                <Button loading={loading} onClick={sendMail} style={{ borderRadius: 10, marginTop: 20, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Send Mail</Button>
              </div>
              <div style={{ display: 'flex' }} >
                <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? '#FFFFFF' : 'black', backgroundColor: !option ? '#FF6A3D' : 'grey', padding: 8 }} >Details</div>
                <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? 'black' : '#ffffff', backgroundColor: !option ? 'grey' : '#FF6A3D', padding: 8 }} >Resume</div>
              </div>
              {option ?
                <FileViewer
                  filePath={datas.url}
                  fileType='pdf'
                  onError={e => {
                    console.log(e, "error in file-viewer");
                  }}
                /> :
                <div style={{ backgroundColor: '#F8F3EF', height: '70vh' }} >
                  <div style={{ padding: 20 }} >
                    <h2>QUALIFICATIONS</h2>
                    <p>{datas.parsedata.EDUCATION}</p>
                  </div>
                  <div style={{ padding: 20 }} >
                    <h2>EXPERIENCES</h2>
                    <p>{datas.parsedata.EXPERIENCE}</p>
                  </div>
                </div>}
            </div> : null}
          </SidePane>
        </div>

      </div>
    </SideDrawer>
  );
}
