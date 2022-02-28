import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CloseOutlined } from '@ant-design/icons';
import { DeleteJob } from "../store/action/job";
import { useDispatch } from "react-redux";
import { Modal } from 'antd';

function JobCard(props) {
  const [jobType, setJobType] = useState();
  const [flag, setFlag] = useState(0);
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch()
  const selectingJob = (event) => {

    console.log(event.target.innerText);
    let string = event.target.innerText.replace(/ /g, "");
    setJobType(string);
    setFlag(1);
    console.log(flag);
  };
  const DeleteData = async (id) => {
    await dispatch(DeleteJob(id))
  }
  const config = {
    title: `Delete Job Opening of ${props.jobPost}`,
    content: (
      <>
        <p>Are You sure you want to delete this Job Post? </p>
        <p>Note: The application data recevied till now won't be deleted from the database </p>
      </>
    ),
    onOk: DeleteData(props.id)
  }

  if (flag == 1) {
    return <Navigate to={"/admin/job/" + jobType} state={{ mode: props.mode, description: props.description, skills: props.skills }} />;
  }
  return (
    <div>
      {contextHolder}
      <div
        onClick={selectingJob}
        style={{
          backgroundColor: "#6C63FF",
          fontFamily: "Montserrat",
          borderRadius: 20,
          width: "13vw",
          height: "22vh",
          textAlign: "center",
          display: "block",
          margin: 10
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 10 }} >
          <CloseOutlined style={{ color: 'white' }} onClick={() => { modal.confirm(config) }} />
        </div>
        <WorkIcon style={{ fontSize: 40, margin: 10, color: "white" }} />
        <h2 style={{ color: "white" }}>{props.jobPost}</h2>
      </div>
    </div>
  );
}

export default JobCard;
