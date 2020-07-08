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
    return (<div>
        {data.map(data => (<Post content={data.content} description={data.description} />))}

    </div>)
}