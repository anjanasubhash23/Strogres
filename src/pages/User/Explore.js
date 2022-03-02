import './Explore.css'
import React from 'react'
import TopNavBar from './TopNavBar'
import {Input,Space} from 'antd'
import { FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Search } = Input;


export default function Explore() {
  return (
    <TopNavBar>
      <div className="Explore">
        <header>
          <div className="Explore-searchBar">
            <Search
              placeholder="Search Job Opening"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={() => console.log("search")}
            />
          </div>
          <div className="Explore-heading">
            <h1>Job based of your preferences</h1>
            <FilterOutlined className="Explore-icon" />
          </div>
        </header>
        <div className="Explore-jobOverview">
          <div className="jobOverview_header">
            <h1>Human Resource(HR)</h1>
            <p>Reliance(Jio)</p>
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
              <button>
                <Link
                  style={{ color: "white" }}
                  to={"viewdetails/Human-Resource"}
                >
                  View Details
                </Link>
              </button>
              <button>Apply</button>
            </div>
          </div>
        </div>

        <div className="Explore-jobOverview">
          <div className="jobOverview_header">
            <h1>Human Resource(HR)</h1>
            <p>Reliance(Jio)</p>
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
              <button>View Details</button>
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </TopNavBar>
  );
}
