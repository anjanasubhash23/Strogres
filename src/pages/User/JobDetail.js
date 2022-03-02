import './JobDetail.css'
import React, { useState } from 'react'
import { useLocation } from "react-router";
import TopNavBar from './TopNavBar';
import { applyData } from '../../store/action/applicant'
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

export default function JobDetail() {
  const newData = []
  const data = useLocation()
  if (data.state.info.skills.length !== 0) {
    data.state.info.skills.map(x => { newData.push(x.text); return 0; })
  }
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const jobType = data.state.info.mode === 0 ? "Full Time" : "Part Time"
  const Applied = async () => {
    try {
      setLoading(true)
      await dispatch(applyData(data.state.info.cid, data.state.info.jid, data.state.info.jobPost, data.state.info.companyName, jobType, new Date().toLocaleDateString()))
      setLoading(false)
      toast.success("Job Applied Successfully", {
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
      setLoading(false)
      toast.success(err.message, {
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
    <TopNavBar>
      <div className="JobDetails">
        <ToastContainer />
        <header>
          <div className="Explore-jobOverview">
            <div className="jobOverview_header">
              <h1 style={{ fontSize: 27 }}>{data.state.info.jobPost}</h1>
              <p style={{ fontSize: 15, paddingRight: 3 }}>{data.state.info.companyName}</p>
            </div>
            <div className="jobOverview_description_container">
              <div className="jobOverview_description">
                <div className="jobOverview_description_header">
                  <p>Job Type</p>
                  <p>Mode</p>
                  <p>Apply By</p>
                </div>
                <div>
                  <p>{data.state.info.mode === 0 ? "Full Time" : "Part Time"}</p>
                  <p>{data.state.info.type === 0 ? "WFH" : "OnSite"}</p>
                  <p>{data.state.info.lastdate}</p>
                </div>
              </div>
              <div className="jobOverview_button_container">
                <button onClick={Applied} >Apply</button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="JobDetails-description">
            <h1>Job Description</h1>
            <p>
              {data.state.info.description}
            </p>
          </div>
          <div className="JobDetails-description">
            <h1>Skills Required</h1>
            <p>
              {data.state.info.skills.length !== 0 ? newData.join(" , ") : ""}
            </p>
          </div>
        </main>
      </div>
    </TopNavBar>
  );
}
