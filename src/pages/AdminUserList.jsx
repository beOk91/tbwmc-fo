import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserList from '../components/UserList';
const AdminUserList = ()=>{
    return (
        <>
            <Header/>
            <UserList/>
            <Footer />
        </>
    );
};

export default AdminUserList;