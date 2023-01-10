import React,{ useState, useRef }  from 'react';
import axios from 'axios';

const Test = () => {
    const [text, setText] = useState('api call');
    const apiCall = async ()=>{
        console.log('hello api call');
        const res = await axios.get('/api/hello', {withCredentials: true });
        console.log(res.data);
        setText(res.data);
        return res.data; 
    };

    return (
        <>
        <button onClick={apiCall}>{text}</button>
        </>

    );
}

export default Test;