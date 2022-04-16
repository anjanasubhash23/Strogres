import React from 'react'

function FeatureCard(props) {
    return (
        <div style={{ width: "25vw", paddingInline: 10, margin: "2vw", textAlign: 'center', paddingTop: "5%", fontFamily: 'Montserrat', height: "60vh", borderRadius: 20, backgroundColor: "#f7f8f9" }} >
            <div>
                <img alt="img" src={props.img} style={{ width: "80%" }} />
            </div>
            <div style={{ margin: 10, marginTop: 30 }} >
                <p style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }} >{props.para}</p>
            </div>
        </div>
    )
}

export default FeatureCard