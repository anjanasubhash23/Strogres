import React from "react";
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

function DashBoard() {
    return (
        <SideDrawer>
            <div className="DashBoard">
                <h1 style={{ padding: 20 }} >DashBoard</h1>
                <section>
                    <div className="container">
                        <div className="subContainer">
                            <WorkIcon style={{ fontSize: "400%", padding: "1rem" }} />

                            <div className="container-description">
                                <h1>No of Job Posted</h1>
                                <p>10</p>
                            </div>
                        </div>

                        <div className="subContainer">
                            <FileOutlined style={{ fontSize: "200%", padding: "1rem" }} />

                            <div className="container-description">
                                <h1>No of Applicants Received</h1>
                                <p>10</p>
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
                                <p>10</p>
                            </div>
                        </div>

                        <div className="subContainer">
                            <PrinterOutlined
                                style={{ fontSize: "200%", padding: "1rem" }}
                            />

                            <div className="container-description">
                                <h1>No of Resume Parsed</h1>
                                <p>10</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </SideDrawer>
    );
}

export default DashBoard;