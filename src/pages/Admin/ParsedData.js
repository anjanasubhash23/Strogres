import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ParseDetails from '../../components/ParseDetails'
import SideDrawer from '../../components/SideDrawer'
import { fetchcount } from '../../store/action/applicant'

function ParsedData() {
    const [loading, setLoading] = useState(false)
    const data = useSelector(x => x.app.count)
    const dispatch = useDispatch()
    const fetchdata = async () => {
        await dispatch(fetchcount())
    }
    useEffect(() => {
        setLoading(true)
        fetchdata()
        setLoading(false)
    }, [])
    console.log(data)
    if (loading) {
        return (
            <SideDrawer>
                <div style={{ position: 'absolute', top: '50%', left: '55%', textAlign: 'center' }} >
                    <Spin size='large' style={{ color: '#FF6A3D' }} />
                </div>
            </SideDrawer>
        )
    }
    return (
        <SideDrawer>
            <ParseDetails parsedata={data} />
        </SideDrawer>
    )
}

export default ParsedData