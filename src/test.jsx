import React from 'react';
import axios from 'axios';

const Test = () => {
    const apiCall = ()=>{
        console.log('hello api call');
        const res = axios.get('http://localhost:8080/api/hello',{withCredentials: true });
        console.log(res);
        console.log('bye api call');
    };

    return (
        <>
        <button onClick={apiCall}>api call</button>
        </>

    );
}

export default Test;