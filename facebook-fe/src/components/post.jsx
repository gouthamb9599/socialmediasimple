import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Post(props) {
    const classes = useStyles();
    const [commentdata, setCommentdata] = React.useState([]);
    const [newcomment, setNewcomment] = React.useState('');
    const [opencomment, setOpencomment] = React.useState(false);
    const handleChangehead = (event) => {
        setNewcomment(event.target.value)
    }
    const getcomment = () => {
        Axios.get(`http://localhost:5000/getcomment?id=${props.id}`)
            .then(res => {
                if (res.data.success === true) {
                    setCommentdata(res.data.data)
                }
            })
        setOpencomment(!opencomment)
    }
    const savecomment = () => {
        const data = JSON.parse(sessionStorage.getItem('userData'));
        Axios.post(`http://localhost:5000/postcomment`, { comment: newcomment, post: props.id, user: data.id })
            .then(res => {
                if (res.data.success === true) {
                    swal('your Comment is posted', 'check comments section', 'success')
                    getcomment();
                }
            })
    }
    const handleClose = () => {
        setNewcomment('')
    }
    return (
        <div style={{ border: '1px solid #3f51b5' }}>
            <div>{props.description}</div>
            <div>{(props.content !== null) ? <img src={props.content} alt="image" /> : <></>}</div>
            <div><Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ThumbUpAltIcon />}>
                {props.reaction} Like</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={getcomment}
                    className={classes.button}
                    startIcon={<CommentIcon />}>
                    {props.comment} Comment</Button></div>
            <div>
                {opencomment ? <div>
                    <div><div>Comments</div>
                        {commentdata.map(data => (<div>
                            <div>
                                <span>User:</span><span>{data.user_id}</span>
                            </div>
                            <div>
                                <span>Comment:</span> <span>{data.comment}</span>
                            </div>
                        </div>))}</div>
                    <div>
                        <textarea name="comment" value={newcomment} cols="50" rows="4" onChange={handleChangehead} placeholder="Enter your Feed"></textarea>
                        <Button onClick={handleClose} color="primary">
                            Cancel
          </Button>
                        <Button onClick={savecomment} color="primary">
                            Add Comment
          </Button>
                    </div>
                </div> : <></>}
            </div>
        </div >)
}