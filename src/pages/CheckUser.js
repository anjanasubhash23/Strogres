import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AdminData, ApplicantData } from '../store/action/auth'

function CheckUser() {
    const role = useSelector(x => x.auth.admin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log("heheh", role)
    const checkuser = async () => {
        if (role) {
            await dispatch(AdminData())
            navigate("/admin/dashboard")
        }
        else {
            await dispatch(ApplicantData())
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