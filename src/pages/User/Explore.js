import './Explore.css'
import React, { useEffect, useState } from 'react'
import TopNavBar from './TopNavBar'
import { Checkbox, Input, Space } from 'antd'
import { FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { displayJob } from '../../store/action/job';
import { Navigate } from "react-router-dom";
const { Search } = Input;


export default function Explore() {
  const [flag, setFlag] = useState(0)
  const [data, setData] = useState()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(false)
  const [list, setList] = useState()
  const [fdata, setFdata] = useState([])
  const jobdata = useSelector(x => x.job.appJob)
  const userdata = useSelector(x => x.auth.userData)
  const dispatch = useDispatch()
  const display = async () => {
    await dispatch(displayJob())
  }
  const continousSearch = (text) => {

    let list = []
    console.log("happenning")
    setSearch(text)
    list = jobdata.filter(x => x.jobPost.toLowerCase().includes(text.toLowerCase()))
    setList(list)


  }
  useEffect(() => {
    display()
    const data = jobdata.filter(x => x.jobPost.toLowerCase() === userdata.job[0].toLowerCase())
    console.log(jobdata.some(x => x.jobPost.toLowerCase() === userdata.job[0].toLowerCase()))
    let filtered = data.concat(jobdata.filter(x => x.jobPost.toLowerCase() === userdata.job[1].toLowerCase()))
    console.log(data, filtered)
    setFdata(filtered)
  }, [])
  if (flag == 1) {
    return <Navigate to={"/user/explore/viewdetails/" + data.jobPost} state={{ info: data }} />;
  }
  console.log(jobdata, filter, fdata)
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
              onChange={x => continousSearch(x.target.value)}
              onSearch={() => console.log("search")}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }} >
            <div style={{ display: 'flex' }}  >
              <Checkbox style={{ color: '#f8643c' }} onChange={() => setFilter(!filter)} />
              <h3 style={{ marginLeft: 10 }} >Apply Filter Based on Preferences</h3>
            </div>

          </div>
        </header>
        {filter && fdata.length === 0 ? <div>

        </div> : null}
        {search != "" ? list.filter(x => new Date(x.lastdate) > new Date()).map(x => {
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

                </div>
              </div>
            </div>
          )
        }) : filter && fdata.length != 0 ? fdata.filter(x => new Date(x.lastdate) > new Date()).map(x => {
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

                </div>
              </div>
            </div>
          )
        }) : jobdata.filter(x => new Date(x.lastdate) > new Date()).map(x => {
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

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </TopNavBar>
  );
}
