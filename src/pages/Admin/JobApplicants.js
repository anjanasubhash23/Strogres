import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router";
import { SidePane } from 'react-side-pane';
import SideDrawer from "../../components/SideDrawer";
import './JobApplicant.css'
import FileViewer from 'react-file-viewer';
import { useDispatch, useSelector } from 'react-redux'
import { fetchcount } from "../../store/action/applicant"

export default function JobApplicants(props) {
  const newData = []
  const applicant = useSelector(x => x.app.count)
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
                    <td onClick={() => setOpenPanel(true)} >View Details</td>
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
            <div>
              <div style={{ backgroundColor: '#F0ECEC', height: "20vh" }} >

              </div>
              <div style={{ display: 'flex' }} >
                <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? '#FFFFFF' : 'black', backgroundColor: !option ? '#FF6A3D' : 'grey', padding: 8 }} >Details</div>
                <div onClick={() => { setOption(!option) }} style={{ fontFamily: 'Montserrat', textAlign: 'center', width: '50%', color: !option ? 'black' : '#ffffff', backgroundColor: !option ? 'grey' : '#FF6A3D', padding: 8 }} >Resume</div>
              </div>
              {option ?
                <FileViewer
                  filePath='https://firebasestorage.googleapis.com/v0/b/progresskhata-b42cc.appspot.com/o/PK%2Ftask_file%2Ftestsample.pdf?alt=media&token=9a901420-2a23-412a-8af4-bceb150fa416'
                  fileType='pdf'
                  onError={e => {
                    console.log(e, "error in file-viewer");
                  }}
                /> :
                <div style={{ backgroundColor: '#F8F3EF', height: '70vh' }} >

                </div>}
            </div>
          </SidePane>
        </div>

      </div>
    </SideDrawer>
  );
}
