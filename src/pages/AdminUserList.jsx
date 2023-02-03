import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

import UserList from '../components/UserList';
import Register from '../components/Register';

const AdminUserList = ()=>{
    const [size, setSize] = useState('middle');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataSource,setDataSource] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const retrieveUser = async ()=>{
        try{
            const response = await axios.get('/user/list', {withCredentials: true });
            setDataSource(response.data);
        }catch(err){
            console.log(err);
        }
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
                <Button type="primary" size={size} style={{position: 'absolute', right: "140px", marginRight: "24px"}} onClick={showModal} >
                    등록
                </Button>
                <Button type="primary" onClick={retrieveUser} icon={<SearchOutlined />} style={{position:"absolute", right:"50px", margin:"0 24px"}}>
                조회
                </Button>
            </div>
            <Modal title="회원 등록" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >
                    <Register handleCancel={handleCancel}/>
            </Modal>
            <UserList dataSource={dataSource}/>
        </>
    );
};

export default AdminUserList;