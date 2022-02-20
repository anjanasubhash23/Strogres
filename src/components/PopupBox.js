import { Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import "./PopupBox.css"

function PopupBox(props) {
    const [value, setValue] = useState(0)
    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [skills, setSkills] = useState([]);

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

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const handleOk = () => {
        props.handleok(false)
    };

    const handleCancel = () => {
        props.handlecancel(false);
    };
    return (
        <div>
            <Modal title="Add Job Post" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: 'flex' }} >
                    <Input style={{ width: '60%' }} placeholder='Job Designation' />
                    <Input style={{ width: '30%', marginLeft: 20 }} placeholder='No of Opening' />
                </div>
                <TextArea rows={4} placeholder='Job Description' style={{ marginTop: 30 }} />
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
                <Radio.Group style={{ marginTop: 30 }} onChange={x => setValue(x.target.value)} value={0} >
                    <Radio value={0} >Full-Time</Radio>
                    <Radio value={1} >Part-Time</Radio>
                </Radio.Group>
            </Modal>
        </div>);
}

export default PopupBox;
