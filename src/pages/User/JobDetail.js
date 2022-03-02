import './JobDetail.css'
import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router";
import TopNavBar from './TopNavBar';

export default function JobDetail() {
    const { type } = useParams();
  return (
    <TopNavBar>
      <div className="JobDetails">
        <header>
          <div className="Explore-jobOverview">
            <div className="jobOverview_header">
              <h1 style={{ fontSize: 27 }}>Human Resource(HR)</h1>
              <p style={{ fontSize: 15, paddingRight: 3 }}>Reliance(Jio)</p>
            </div>
            <div className="jobOverview_description_container">
              <div className="jobOverview_description">
                <div className="jobOverview_description_header">
                  <p>Job Type</p>
                  <p>Salary</p>
                  <p>Apply By</p>
                </div>
                <div>
                  <p>Full Time</p>
                  <p>30,000/month</p>
                  <p>1/12/2022</p>
                </div>
              </div>
              <div className="jobOverview_button_container">
                <button>Apply</button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="JobDetails-description">
            <h1>Job Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              consequatur nulla dolor at soluta incidunt doloribus nam provident
              esse ipsa laboriosam suscipit aliquam nihil et eius architecto
              debitis, corporis fugiat vero doloremque eos animi dolore beatae?
              Illo, perferendis consequatur, vel sint voluptatem voluptatum
              vitae, in consectetur atque quaerat reiciendis ipsum?
            </p>
          </div>
          <div className="JobDetails-description">
            <h1>Skills Required</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              consequatur nulla dolor at soluta incidunt doloribus nam provident
              esse ipsa laboriosam lode aliquam nihil et eius architecto
              debitis, corporis fugiat vero doloremque eos animi dolore beatae?
              Illo, perferendis consequatur, vel sint voluptatem voluptatum
              vitae, in consectetur atque quaerat reiciendis ipsum?
            </p>
          </div>
        </main>
      </div>
    </TopNavBar>
  );
}
