import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import JobCard from '../../components/JobCard'
import SideDrawer from '../../components/SideDrawer'
import { fetchJob } from '../../store/action/job'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'

function AdminJob() {
    const job = useSelector(x => x.job.job)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            setLoad(true)
            await dispatch(fetchJob())
            setLoad(false)
        }
        fetch()
    }, [])
    if (load) {
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
            <div style={{ height: '90vh', backgroundColor: 'white' }} >
                <h2 style={{ padding: 20 }} >Job Posted</h2>

                {job.length === 0 ? <div style={{ position: 'absolute', top: '50%', left: '50%' }} >
                    <h2>No Job Opening Added Yet</h2>
                </div> : <div style={{

                    display: "grid",
                    width: "90%",
                    marginLeft: "1%",
                    gridTemplateColumns: "repeat(5,auto)",
                    listStyle: "none",
                    gridGap: "1vw",
                    marginTop: "2vh",
                    marginBottom: "8vh",
                }}> {job.map(x => {
                    return (

                        <JobCard data={x} />
                    )
                })}</div>}

            </div>
        </SideDrawer>
    )
}

export default AdminJob