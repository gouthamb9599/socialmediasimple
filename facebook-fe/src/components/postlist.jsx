import React, { useState, useEffect } from 'react';
import Post from '../components/post';
import Axios from 'axios';
export default function Postlist(props) {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.get(`http://localhost:5000/getpost?id=${user.id}`)
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
            })
    }, []);
    return (<div style={{ marginTop: '100px', marginLeft: '250px' }}>
        <div style={{ paddingBottom: '15px', fontSize: '20px' }}>Your Posts</div>
        <div>{data.map(data => (<Post id={data.id} content={data.content} description={data.description} reaction={data.reaction} comment={data.comment_count} />))}</div>
    </div>)
}