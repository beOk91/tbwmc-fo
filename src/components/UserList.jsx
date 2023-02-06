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
        dataIndex: 'memberName',
    },
    {
        title: '등록일',
        dataIndex: 'registeredDt',
    },
    {
        title: '수강개월',
        dataIndex: 'lessonDay',
    },
    {
        title: '수강시간',
        dataIndex: 'lessonTime',
    },
    {
        title: '이메일',
        dataIndex: 'email',
    },
    {
        title: '번호',
        dataIndex: 'phoneNumber',
    }
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