import React, { useState } from 'react'
import { useLocation, useParams } from "react-router";
import { SidePane } from 'react-side-pane';
import SideDrawer from "../../components/SideDrawer";
import './JobApplicant.css'
import FileViewer from 'react-file-viewer';

export default function JobApplicants(props) {
  const { type } = useParams();
  const [openPanel, setOpenPanel] = useState(false)
  const data = useLocation()
  const [option, setOption] = useState(false)
  return (
    <SideDrawer>
      <div className="JobApplicants">
        <div className="job-subContainer">

          <h1 style={{ fontSize: 25 }} >{type}</h1>
          <p>Mode: {data.state.mode === 0 ? "Full Time" : "Part Time"}</p>
          <p>Job Description: {data.state.description}</p>
          <p>Skills Required:{data.state.skills.length !== 0 ? data.state.skills.map(x => { return <p>{x.text}</p> }) : ""} </p>
          <div className="job-tableContainer">
            <table className='job-table'>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td onClick={() => setOpenPanel(true)} >View Details</td>
                <td>Remove</td>
                <td>Send Mail</td>
              </tr>

              <tr>
                <td>Alfreds Futterkistdadadadadadade</td>
                <td>View Details</td>
                <td>Remove</td>
                <td>Send Mail</td>
              </tr>

              <tr>
                <td>Alfreds Futterkiste</td>
                <td>View Details</td>
                <td>Remove</td>
                <td>Send Mail</td>
              </tr>
            </table>
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
