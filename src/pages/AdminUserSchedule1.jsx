import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import Schedule1 from '../components/Schedule1';
import Register from '../components/Register'

const AdminUserSchedule1 = ()=>{
    const [size, setSize] = useState('middle'); // default is 'middle'
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div style={{marginLeft:"auto", height:"30px", marginRight: "24px", margin: "10px 50px 10px 50px"}}>
                <Button type="primary" size={size} style={{position: 'absolute', right: "50px", marginRight: "24px"}} onClick={showModal} >
                    등록
                </Button>
            </div>
                <Modal title="수강 등록" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Register/>
                </Modal>
            <Schedule1/>
        </>
    );
};

export default AdminUserSchedule1;