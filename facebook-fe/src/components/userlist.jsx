import React, { useState, useEffect } from 'react';
import User from '../components/user';
import Axios from 'axios';
export default function Userlist(props) {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/getusers?id=${user.id}`)
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
            })
    }, []);
    return (<div style={{ marginTop: '100px', marginLeft: '250px' }}>
        <div style={{ paddingBottom: '15px', fontSize: '20px' }}>Friends</div>
        <div>{data.map(data => (<User id={data.id} name={data.name} info={data.personal_info} />))}</div>
    </div>)
}