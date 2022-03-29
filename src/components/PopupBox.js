import { Input, Radio, Button, DatePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { toast, ToastContainer } from 'react-toastify';
import { addJobOpening, editJob } from '../store/action/job';
import "./PopupBox.css"


function PopupBox(props) {
    const [id, setId] = useState(props.editable ? props.data.id : 0)
    const [value, setValue] = useState(props.editable ? props.data.mode : 0)
    const [city, setCities] = useState(props.editable ? props.data.city : " ")
    const [type, setType] = useState(props.editable ? props.data.type : 0)
    const [post, setPost] = useState(props.editable ? props.data.jobPost : "")
    const [opening, setOpening] = useState(props.editable ? props.data.noOpening : 0)
    const [description, setDescription] = useState(props.editable ? props.data.jobDescription : "")
    const [skills, setSkills] = useState(props.editable ? props.data.skills : []);
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(props.editable ? props.data.lastdate : new Date().toLocaleDateString())
    const dispatch = useDispatch()
    console.log(props.editable)
    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];


    const handleDelete = i => {
        setSkills(skills.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        console.log(tag)
        setSkills([...skills, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = skills.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setSkills(newTags);
    };
    function onChange(date, dateString) {
        setDate(dateString)
    }
    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const handleOk = async () => {
        if (props.editable) {
            try {
                setLoading(true)
                await dispatch(editJob(id, post, opening, description, skills, value, type, date, city))
                setLoading(false)
                toast.success("Job Edited Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            catch (err) {
                setLoading(false)
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
        else {
            try {
                setLoading(true)
                await dispatch(addJobOpening(post, opening, description, skills, value, type, date, city))
                setLoading(false)
                toast.success("Job Added Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setDescription(""); setPost(""); setValue(0); setSkills([]); setOpening("")
            }
            catch (err) {
                setLoading(false)
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
        props.handleok(false)
    };

    const handleCancel = () => {
        props.handlecancel(false);
    };
    return (
        <div>
            <ToastContainer />
            <Modal title="Add Job Post" centered visible={props.visible} footer={[
                <Button loading={loading} style={{ borderRadius: 10, backgroundColor: '#FF6A3D', margin: 5, color: 'white' }} onClick={handleOk}>
                    {props.editable ? "Edit Job" : "Add Job"}
                </Button>]} onCancel={handleCancel} style={{ marginBottom: 30 }} >
                <div style={{ display: 'flex' }} >
                    <Input value={post} style={{ width: '60%' }} onChange={x => setPost(x.target.value)} placeholder='Job Designation' />
                    <Input value={opening} style={{ width: '30%', marginLeft: 20 }} onChange={x => setOpening(x.target.value)} placeholder='No of Opening' />
                </div>
                <TextArea value={description} rows={4} placeholder='Job Description' onChange={x => setDescription(x.target.value)} style={{ marginTop: 30 }} />
                <div style={{ marginTop: 30 }} >
                    <h3>Skills Required</h3>
                    <ReactTags
                        tags={skills}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                    />
                </div>
                <div style={{ marginTop: 30 }}>
                    <label style={{ marginRight: 20 }}>Mode</label>
                    <Radio.Group onChange={x => { setType(x.target.value); console.log(x.target.value) }} value={type} >
                        <Radio value={0} >WFH</Radio>
                        <Radio value={1} >On-Site</Radio>
                    </Radio.Group>
                    {type === 1 ? <Input style={{ width: '30%', marginLeft: 20 }} onChange={x => setCities(x.target.value)} placeholder='Enter the Location' /> : null}

                </div>
                <div>
                    <label style={{ marginRight: 20 }} >Type</label>
                    <Radio.Group style={{ marginTop: 30 }} onChange={x => { setValue(x.target.value); console.log(x.target.value) }} value={value} >
                        <Radio value={0} >Full-Time</Radio>
                        <Radio value={1} >Part-Time</Radio>
                    </Radio.Group>

                </div>
                <div style={{ marginTop: 30 }}>
                    <label style={{ marginRight: 20 }} >Last Date to Apply</label>
                    {props.editable ? <p>Current Last Date: {date}</p> : null}
                    <DatePicker onChange={onChange} />
                </div>
            </Modal>
        </div>);
}

export default PopupBox;
