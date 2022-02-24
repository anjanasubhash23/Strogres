import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function JobCard(props) {
  const [jobType, setJobType] = useState();
  const[flag ,setFlag] = useState(0);

  const selectingJob = (event) => {
   
    console.log(event.target.innerText);
    let string = event.target.innerText.replace(/ /g, "");
    setJobType(string);
    setFlag(1);
    console.log(flag);
  };

  if (flag == 1) {
    return <Navigate to={"/admin/job/" + jobType} />;
  }
  return (
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
      }}
    >
      <WorkIcon style={{ fontSize: 40, margin: 10, color: "white" }} />
      <h2 style={{ color: "white" }}>Software Developer</h2>
    </div>
  );
}

export default JobCard;
