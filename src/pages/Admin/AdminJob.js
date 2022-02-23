import React from 'react'
import JobCard from '../../components/JobCard'
import SideDrawer from '../../components/SideDrawer'

function AdminJob() {
    return (
        <SideDrawer>
            <div style={{ height: '90vh', backgroundColor: 'white' }} >
                <h1 style={{ padding: 20, fontSize: 25 }} >Job Posted</h1>
                <div style={{ padding: 30 }}>
                    <JobCard />
                </div>
            </div>
        </SideDrawer>
    )
}

export default AdminJob