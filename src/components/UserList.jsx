import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Id',
        dataIndex: 'Id',
        width: '10%'
    },
    {
        title: 'UserName',
        dataIndex: 'UserName',
        width: '20%'
    },
    {
        title: 'columns1',
        dataIndex: 'columns1',
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

const datasource = {};

const UserList = () => {
    return (
        <Table
            columns={columns}
            datasource={datasource}
            rowKey="Id"
        />
    )
}
export default UserList;