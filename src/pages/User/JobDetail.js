import "./JobDetail.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import TopNavBar from "./TopNavBar";
import { applyData } from "../../store/action/applicant";
import { toast, ToastContainer } from "react-toastify";
import { Button, Modal } from "antd";
import { Navigate } from "react-router-dom";
import { WarningOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { FetchAppliedJob } from "../../store/action/applicant";

export default function JobDetail() {
  const appliedData = useSelector((x) => x.app.applied);
  const user = useSelector((x) => x.auth.userData);
  const[isApplied,setIsApplied] = useState(false);
  const fetchdata = async () => {
    await dispatch(FetchAppliedJob());
  };
  useEffect(() => {
    fetchdata();
    checkIfApplied();
  }, []);

  const checkIfApplied = () => {
    if(data.state.info.jid === appliedData[0].jid){
      setIsApplied(true)
    }
    else{
      setIsApplied(false)
    }
    // console.log("User applied on => ",appliedData[0].jid)
    // console.log("Job Id =>", data.state.info.jid)

  }

  console.log("USER APPLIED DATA => ", appliedData);
  const newData = [];
  const data = useLocation();
  if (data.state.info.skills.length !== 0) {
    data.state.info.skills.map((x) => {
      newData.push(x.text);
      return 0;
    });
  }
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const jobType = data.state.info.mode === 0 ? "Full Time" : "Part Time";

  const navigate = useNavigate();

  const Applied = async () => {
    try {
      setLoading(true);
      await dispatch(
        applyData(
          data.state.info.cid,
          data.state.info.jid,
          data.state.info.jobPost,
          data.state.info.companyName,
          jobType,
          new Date().toLocaleDateString()
        )
      );
      setLoading(false);
      toast.success("Job Applied Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setLoading(false);
      toast.success(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <TopNavBar>
      <div className="JobDetails">
        <ToastContainer />
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={[
            <Button
              style={{ color: "#f7f8f9", backgroundColor: "#f8643c" }}
              onClick={() => navigate("/user/resumeupload")}
            >
              Change Resume
            </Button>,
            <Button
              style={{ color: "#f7f8f9", backgroundColor: "#f8643c" }}
              onClick={Applied}
            >
              Continue with the same
            </Button>,
            //     <Button style={{ color: '#f7f8f9', backgroundColor: "#f8643c" }} onClick={() => console.log(data.state.info)}  >
            //   Console
            // </Button>
          ]}
          title={
            <div style={{ display: "flex" }}>
              <WarningOutlined style={{ fontSize: 25, color: "#2662ff" }} />
              <h3 style={{ marginLeft: 20 }}>Alert Info</h3>
            </div>
          }
        >
          <>
            <p>
              You are about to apply for this job using your previous
              resume.Would you like to change the resume or continue with the
              same
            </p>
          </>
        </Modal>
        <header>
          <div className="Explore-jobOverview">
            <div className="jobOverview_header">
              <h1 style={{ fontSize: 27 }}>{data.state.info.jobPost}</h1>
              <p style={{ fontSize: 15, paddingRight: 3 }}>
                {data.state.info.companyName}
              </p>
            </div>
            <div className="jobOverview_description_container">
              <div className="jobOverview_description">
                <div className="jobOverview_description_header">
                  <p>Job Type</p>
                  <p>Mode</p>
                  <p>Apply By</p>
                </div>
                <div>
                  <p>
                    {data.state.info.mode === 0 ? "Full Time" : "Part Time"}
                  </p>
                  <p>{data.state.info.type === 0 ? "WFH" : "OnSite"}</p>
                  <p>{data.state.info.lastdate}</p>
                </div>
              </div>
              <div className="jobOverview_button_container">
                <Button disabled = {isApplied? true : false} loading={loading} onClick={() => setVisible(true)}>
                  {isApplied? 'Already Applied' : 'Apply'}
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="JobDetails-description">
            <h1>Job Description</h1>
            <p>{data.state.info.description}</p>
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
