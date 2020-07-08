import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import swal from 'sweetalert';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function User(props) {
    const classes = useStyles();
    const setfollow = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.post(`http://localhost:5000/setfollow`, { clickid: user.id, followid: props.id })
            .then(res => {
                if (res.data.success == true) {
                    swal(`${props.name} is added to your following list`, "check your following list", "success")
                }
            })
    }
    return (
        <div style={{ border: '1px solid #3f51b5' }}>
            <div>{props.name}</ div>
            <div>{props.personal_info} </div >
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={setfollow}
                >Follow</Button>
            </div>
        </div>)
}