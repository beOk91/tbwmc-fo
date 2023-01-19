import React,{useState} from 'react';
import { Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const columns = [
    {
        title: 'Id',
        dataIndex: 'memberSeq',
        width: '10%'
    },
    {
        title: 'UserName',
        dataIndex: 'memberId',
        width: '20%'
    },
    {
        title: '이름',
        dataIndex: 'name',
    },
    {
        title: 'columns2',
        dataIndex: 'columns2',
    },
    {
        title: 'columns3',
        dataIndex: 'columns3',
    },
    {
        title: 'columns4',
        dataIndex: 'columns4',
    }
];



const UserList = () => {
    const [dataSource,setDataSource] = useState([]);
    const retrieveUser = async ()=>{
        try{
            const response = await axios.get('/user/list', {withCredentials: true });
            setDataSource(response.data);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <Button type="primary" onClick={retrieveUser} icon={<SearchOutlined />}>
            조회
            </Button>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="Id"
            />
        </>
    )
}
export default UserList;