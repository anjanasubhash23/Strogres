import React from 'react'
import WorkIcon from "@mui/icons-material/Work";

function JobCard(props) {
    return (
        <div style={{ backgroundColor: '#6C63FF', fontFamily: 'Montserrat', borderRadius: 20, width: '13vw', height: '22vh', textAlign: 'center' }} >
            <WorkIcon style={{ fontSize: 40, margin: 10, color: 'white' }} />
            <h2 style={{ color: 'white' }} >Software Developer</h2>
        </div>
    )
}

export default JobCard