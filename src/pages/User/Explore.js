import './Explore.css'
import React, { useEffect, useState } from 'react'
import TopNavBar from './TopNavBar'
import { Input, Space } from 'antd'
import { FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { displayJob } from '../../store/action/job';
import { Navigate } from "react-router-dom";
const { Search } = Input;


export default function Explore() {
  const [flag, setFlag] = useState(0)
  const [data, setData] = useState()
  const jobdata = useSelector(x => x.job.appJob)
  const dispatch = useDispatch()
  const display = async () => {
    await dispatch(displayJob())
  }

  useEffect(() => {
    display()
  }, [])
  if (flag == 1) {
    return <Navigate to={"/user/explore/viewdetails/" + data.jobPost} state={{ info: data }} />;
  }
  console.log(jobdata)
  return (
    <TopNavBar>
      <div className="Explore" style={{ fontFamily: "Montserrat" }} >
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
        {jobdata.map(x => {
          return (
            <div className="Explore-jobOverview">
              <div className="jobOverview_header">
                <h1>{x.jobPost}</h1>
                <p>{x.companyName}</p>
              </div>
              <div className="jobOverview_description_container">
                <div className="jobOverview_description">
                  <div className="jobOverview_description_header">
                    <p>Job Type</p>
                    <p>Mode</p>
                    <p>Apply By</p>
                  </div>
                  <div>
                    <p>{x.mode === 0 ? "Full Time" : "Part Time"}</p>
                    <p>{x.type === 0 ? "WFH" : "OnSite"}</p>
                    <p>{x.lastdate}</p>
                  </div>
                </div>
                <div className="jobOverview_button_container">
                  <button onClick={() => { setData(x); setFlag(1) }} >

                    View Details

                  </button>
                  <button>Apply</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </TopNavBar>
  );
}
