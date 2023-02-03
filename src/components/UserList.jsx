import React,{useState} from 'react';
import { Table } from 'antd';
 
const columns = [
    {
        title: 'seq',
        dataIndex: 'memberSeq',
        width: '10%'
    },
    {
        title: '이름',
        dataIndex: 'memberId',
        width: '20%'
    },
    {
        title: '등록일',
        dataIndex: 'name',
    },
    {
        title: '수강개월',
        dataIndex: 'name',
    },
    {
        title: '수강요일',
        dataIndex: 'name',
    },
    {
        title: '이메일',
        dataIndex: 'email',
    },
];



const UserList = ({dataSource}) => {
    return (
        <>  
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="Id"
            />
        </>
    )
}
export default UserList;