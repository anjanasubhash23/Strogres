import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function CheckUser() {
    const role = useSelector(x => x.auth.admin)
    const navigate = useNavigate()
    console.log("heheh", role)
    const checkuser = () => {
        if (role) {
            navigate("/admin/dashboard")
        }
        else {
            navigate(`/applicant/dashboard`)
        }
    }
    useEffect(() => {
        checkuser()
    })
    return (
        <div></div>
    )
}

export default CheckUser