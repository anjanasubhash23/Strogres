import React from 'react'
import { useParams } from "react-router";
import SideDrawer from "../../components/SideDrawer";
import './JobApplicant.css'

export default function JobApplicants() {
    const { type } = useParams();
    console.log(type);
  return (
    <SideDrawer>
      <div className="JobApplicants">
        <div className="job-subContainer">
          <h2>{type}</h2>
          <p>Full Time</p>
          <p>Job Description</p>
          <p>Job Skils</p>
          <div className="job-tableContainer">
            <table className='job-table'>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>View Details</td>
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
        </div>
      </div>
    </SideDrawer>
  );
}
