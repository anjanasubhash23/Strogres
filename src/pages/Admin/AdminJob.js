import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import JobCard from '../../components/JobCard'
import SideDrawer from '../../components/SideDrawer'
import { DeleteJob, fetchJob } from '../../store/action/job'
import { useSelector } from 'react-redux'
import { Button, Checkbox, Input, Modal, Popover, Radio, Spin } from 'antd'
import { Helmet } from 'react-helmet'
import { InfoCircleOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
const { Search } = Input;

function AdminJob() {
    const job = useSelector(x => x.job.job)
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState("")
    const [list, setList] = useState()
    const [item, setItem] = useState()
    const [fdata, setFdata] = useState([])
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            setLoad(true)
            await dispatch(fetchJob())
            setLoad(false)
        }
        fetch()
    }, [])
    const content = (
        <div style={{ fontFamily: "Montserrat" }} >
            <div style={{ display: 'flex' }} >
                <p>On the basis of last date of application the status field is defined </p>
            </div>

        </div>
    )
    if (load) {
        return (
            <SideDrawer>
                <div style={{ position: 'absolute', top: '50%', left: '55%', textAlign: 'center' }} >
                    <Spin size='large' style={{ color: '#FF6A3D' }} />
                </div>
            </SideDrawer>
        )
    }
    const DeleteData = async () => {
        await dispatch(DeleteJob(id))
        setVisible(false)
    }
    const continousSearch = (text) => {

        let list = []
        console.log("happenning", job.some(x => x.jobPost.toLowerCase().includes(text.toLowerCase())))
        setSearch(text)
        list = job.filter(x => x.jobPost.toLowerCase().includes(text.toLowerCase()))
        setList(list)
    }
    const options = [
        { label: 'Closed', value: "Closed" },
        { label: 'Active', value: "Active" }
    ];
    const onFilter = () => {
        setOpen(false)
        if (item === "Closed") {
            setFdata(job.filter(x => new Date(x.lastdate) < new Date()))
        }
        else {
            setFdata(job.filter(x => new Date(x.lastdate) > new Date()))
        }
    }
    return (
        <SideDrawer>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Job List</title>
            </Helmet>

            <div style={{ height: '90vh', backgroundColor: 'white', fontFamily: 'Montserrat' }} >
                <Modal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onOk={DeleteData}
                    title={
                        <div style={{ display: "flex" }}>
                            <WarningOutlined style={{ fontSize: 25, color: "yellow" }} />
                            <h3 style={{ marginLeft: 20 }}>Warning</h3>
                        </div>
                    }
                >
                    <>
                        <p>Are You sure you want to delete this Job Post? </p>
                        <p>
                            Note: The application data recevied till now won't be deleted from
                            the database{" "}
                        </p>
                    </>
                </Modal>

                <Modal style={{ fontFamily: "Montserrat" }} title="Filter By" visible={open} onCancel={() => setOpen(false)} footer={[<Button onClick={onFilter} style={{ borderRadius: 10, fontFamily: "Montserrat", backgroundColor: '#FF6A3D', margin: 5, color: 'white' }}  >Apply</Button>]} >
                    <Radio.Group options={options} defaultValue={['Selected']} onChange={x => setItem(x.target.value)} />
                </Modal>
                <h2 style={{ padding: 20, textAlign: 'center' }} >Job Posted</h2>
                <div style={{ paddingInline: "10rem" }}>
                    <Search
                        placeholder="Search Job Opening"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onChange={x => continousSearch(x.target.value)}
                        onSearch={() => console.log("search")}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 30, marginTop: 10 }} >
                    <Button onClick={() => setOpen(true)} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} >Filter</Button>
                </div>
                <div style={{ padding: "2rem" }} >
                    {search !== "" && list.length !== 0 ? list.length !== 0 ?
                        <table className='app-table'>
                            <tr>
                                <th>Job Post</th>
                                <th>Application Received</th>
                                <th>Status <Popover content={content} trigger="hover" title="Status Color Info" ><InfoCircleOutlined /></Popover> </th>
                                <th>Remove</th>
                            </tr>
                            {list.map((x, index) => {
                                return (
                                    <tr>

                                        <td onClick={function () { navigate("/admin/job/" + x.jobPost, { state: { info: x } }) }}>{x.jobPost}</td>
                                        <td>{x.count}</td>
                                        {new Date(x.lastdate) > new Date() ? <td style={{ color: 'green' }} >Active</td> : <td style={{ color: "#bbb" }} >Closed</td>}
                                        <td onClick={function () { setId(x.id); setVisible(true) }} ><DeleteOutlined style={{ color: 'red' }} /></td>
                                    </tr>
                                );
                            })}
                        </table> : <div style={{ position: 'absolute', top: '50%', left: '50%' }} >
                            <h2>No Job Opening Added Yet</h2>
                        </div> : fdata.length != 0 ?
                        <table className='app-table'>
                            <tr>
                                <th>Job Post</th>
                                <th>Application Received</th>
                                <th>Status <Popover content={content} trigger="hover" title="Status Color Info" ><InfoCircleOutlined /></Popover> </th>
                                <th>Remove</th>
                            </tr>
                            {fdata.map((x, index) => {
                                return (
                                    <tr>

                                        <td onClick={function () { navigate("/admin/job/" + x.jobPost, { state: { info: x } }) }}>{x.jobPost}</td>
                                        <td>{x.count}</td>
                                        {new Date(x.lastdate) > new Date() ? <td style={{ color: 'green' }} >Active</td> : <td style={{ color: "#bbb" }} >Closed</td>}
                                        <td onClick={function () { setId(x.id); setVisible(true) }} ><DeleteOutlined style={{ color: 'red' }} /></td>
                                    </tr>
                                );
                            })}
                        </table> : job.length != 0 ?
                            <table className='app-table'>
                                <tr>
                                    <th>Job Post</th>
                                    <th>Application Received</th>
                                    <th>Status <Popover content={content} trigger="hover" title="Status Color Info" ><InfoCircleOutlined /></Popover> </th>
                                    <th>Remove</th>
                                </tr>
                                {job.map((x, index) => {
                                    return (
                                        <tr>

                                            <td onClick={function () { navigate("/admin/job/" + x.jobPost, { state: { info: x } }) }}>{x.jobPost}</td>
                                            <td>{x.count}</td>
                                            {new Date(x.lastdate) > new Date() ? <td style={{ color: 'green' }} >Active</td> : <td style={{ color: "#bbb" }} >Closed</td>}
                                            <td onClick={function () { setId(x.id); setVisible(true) }} ><DeleteOutlined style={{ color: 'red' }} /></td>
                                        </tr>
                                    );
                                })}
                            </table> : <div style={{ position: 'absolute', top: '50%', left: '50%' }} >
                                <h2>No Job Opening Added Yet</h2>
                            </div>}
                </div>

                {/* {job.length === 0 ? <div style={{ position: 'absolute', top: '50%', left: '50%' }} >
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
                })}</div>} */}

            </div>
        </SideDrawer>
    )
}

export default AdminJob