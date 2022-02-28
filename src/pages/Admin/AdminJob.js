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
                <h1 style={{ padding: 20, fontSize: 25 }} >Job Posted</h1>

                {job.length === 0 ? <div>
                    <h2>No Job Opening Added Yet</h2>
                </div> : job.map(x => {
                    return (
                        <div style={{
                            padding: 30, display: "grid",
                            width: "80%",
                            marginLeft: "7%",
                            gridTemplateColumns: "repeat(4,auto)",
                            listStyle: "none",
                            gridGap: "3vw",
                            marginTop: "2vh",
                            marginBottom: "8vh",
                        }}>
                            <JobCard jobPost={x.jobPost} description={x.jobDescription} skills={x.skills} mode={x.mode} />
                        </div>)
                })}

            </div>
        </SideDrawer>
    )
}

export default AdminJob