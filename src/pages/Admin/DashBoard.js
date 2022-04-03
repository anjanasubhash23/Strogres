import React, { useEffect } from "react";
import SideDrawer from "../../components/SideDrawer";
import "./DashBoard.css";
import {
    PieChartOutlined,
    InboxOutlined,
    LogoutOutlined,
    PrinterOutlined,
    UserAddOutlined,
    FileOutlined
} from "@ant-design/icons";
import WorkIcon from "@mui/icons-material/Work";
import { useDispatch, useSelector } from "react-redux";
import { fetchJob } from "../../store/action/job";
import { fetchcount } from "../../store/action/applicant";
import { Helmet } from "react-helmet";

function DashBoard() {
    const job = useSelector(x => x.job.job)
    const count = useSelector(x => x.app.count)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchJob())
            await dispatch(fetchcount())
        }
        fetch()
    }, [])
    const appdata = count.filter(x => x.jobid !== undefined)
    const hired = count.filter(x => x.status === "Selected")
    return (
        <SideDrawer>
            <Helmet>
                <meta charSet="utf-8" />
                <title>DashBoard</title>
            </Helmet>
            <div className="DashBoard" style={{ fontFamily: 'Montserrat' }} >
                <h1 style={{ padding: 20 }} >DashBoard</h1>
                <section>
                    <div className="container">
                        <div className="subContainer">
                            <WorkIcon style={{ fontSize: "400%", padding: "1rem" }} />

                            <div className="container-description">
                                <h1>No of Job Posted</h1>
                                <p>{job.length}</p>
                            </div>
                        </div>

                        <div className="subContainer">
                            <FileOutlined style={{ fontSize: "200%", padding: "1rem" }} />

                            <div className="container-description">
                                <h1>No of Applicants Received</h1>
                                <p>{appdata.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="subContainer">
                            <UserAddOutlined
                                style={{ fontSize: "200%", padding: "1rem" }}
                            />

                            <div className="container-description">
                                <h1>No of People Hired</h1>
                                <p>{hired.length}</p>
                            </div>
                        </div>

                        <div className="subContainer">
                            <PrinterOutlined
                                style={{ fontSize: "200%", padding: "1rem" }}
                            />

                            <div className="container-description">
                                <h1>No of Resume Parsed</h1>
                                <p>{count.length}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </SideDrawer>
    );
}

export default DashBoard;