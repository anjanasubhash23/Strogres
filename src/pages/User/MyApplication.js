import React from 'react'
import TopNavBar from './TopNavBar'
import './MyApplication.css'

export default function MyApplication() {
  return (
    <TopNavBar>
      <div className="MyApplication">
        <div
          className="job-tableContainer"
          style={{ backgroundColor: "white" }}
        >
            <h1>My Application</h1>
          <table className="job-table">
            <tr>
              <th>Company Name</th>
              <th>Role</th>
              <th>Job Type</th>
              <th>Applied Date</th>
              <th>View Application</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td> Software Developer</td>
              <td>Part Time</td>
              <td>1/2/22</td>
              <td>Link</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td> Software Developer</td>
              <td>Part Time</td>
              <td>1/2/22</td>
              <td>Link</td>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td> Software Developer</td>
              <td>Part Time</td>
              <td>1/2/22</td>
              <td>Link</td>
            </tr>
          </table>
        </div>
      </div>
    </TopNavBar>
  );
}
