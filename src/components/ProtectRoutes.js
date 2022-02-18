import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes(props) {
    const json_data = localStorage.getItem('data')
    const data = JSON.parse(json_data)
    console.log(data)
    return data.token === " " ? <Navigate to='/' /> : props.children
}

export default ProtectedRoutes