import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CloseOutlined, WarningOutlined } from '@ant-design/icons';
import { DeleteJob } from "../store/action/job";
import { useDispatch } from "react-redux";
import { Modal } from 'antd';

function JobCard(props) {
  const [jobType, setJobType] = useState();
  const [flag, setFlag] = useState(0);
  const [id, setId] = useState()
  const [visible, setVisible] = useState(false)
  // const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch()
  const selectingJob = (event) => {

    console.log(event.target.innerText);
    let string = event.target.innerText.replace(/ /g, "");
    setJobType(string);
    setFlag(1);
    console.log(flag);
  };
  const DeleteData = async () => {
    await dispatch(DeleteJob(id))
    setVisible(false)
  }
  // const config = {
  //   title: `Delete Job Opening of ${props.jobPost}`,
  //   content: (
  //     <>
  //       <p>Are You sure you want to delete this Job Post? </p>
  //       <p>Note: The application data recevied till now won't be deleted from the database </p>
  //     </>
  //   ),
  //   onOk: DeleteData(props.id)
  // }

  if (flag == 1) {
    return <Navigate to={"/admin/job/" + jobType} state={{ info: props.data }} />;
  }
  return (
    <div>
      <Modal visible={visible}
        onCancel={() => setVisible(false)}
        onOk={DeleteData}
        title={<div style={{ display: 'flex' }} ><WarningOutlined style={{ fontSize: 25, color: 'yellow' }} /><h3 style={{ marginLeft: 20 }} >Warning</h3></div>} >
        <>
          <p>Are You sure you want to delete this Job Post? </p>
          <p>Note: The application data recevied till now won't be deleted from the database </p>
        </>
      </Modal>
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
          <CloseOutlined style={{ color: 'white' }} onClick={() => { setVisible(true); setId(props.data.id) }} />
        </div>
        <WorkIcon style={{ fontSize: 32, margin: 5, color: "white" }} />
        <h2 style={{ color: "white" }}>{props.data.jobPost}</h2>
      </div>
    </div>
  );
}

export default JobCard;
