import React from 'react'
import { useParams } from 'react-router'
import ApplicantSignup from '../components/ApplicantSignup'
import EmployerSignup from '../components/EmployerSignup'

function RegisterPage() {
    const { type } = useParams()
    console.log(type)
    return (
        <div>
            {type === 'Emp' ? <EmployerSignup /> : <ApplicantSignup />}
        </div>
    )
}

export default RegisterPage