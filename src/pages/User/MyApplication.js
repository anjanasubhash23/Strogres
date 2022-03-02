import React, { useEffect } from 'react'
import TopNavBar from './TopNavBar'
import './MyApplication.css'
import { useDispatch, useSelector } from 'react-redux';
import { FetchAppliedJob } from '../../store/action/applicant'

export default function MyApplication() {
  const data = useSelector(x => x.app.applied)
  const dispatch = useDispatch()
  const fetchdata = async () => {
    await dispatch(FetchAppliedJob())
  }
  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <TopNavBar>
      <div className="MyApplication" style={{ fontFamily: 'Montserrat' }} >
        <div
          className="job-tableContainer"
          style={{ backgroundColor: "white" }}
        >
          <h1>My Application</h1>
          {data.length !== 0 ? <table className="job-table">
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Job Type</th>
              <th>Applied Date</th>
              <th>View Application</th>
            </tr>
            {data.map(x => {
              return (
                <tr>
                  <td>{x.companyname}</td>
                  <td> {x.jobname}</td>
                  <td>{x.jobtype}</td>
                  <td>{x.applieddate}</td>
                  <td><a href={x.url} target="_blank" >Link</a></td>
                </tr>
              )
            })}


          </table> : <div style={{ position: 'absolute', top: '50%', left: '43%' }} >
            <h2>No Job Applied Yet</h2>
          </div>}
        </div>
      </div>
    </TopNavBar>
  );
}
