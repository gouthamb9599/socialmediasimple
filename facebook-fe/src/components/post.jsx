import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Post(props) {
    const classes = useStyles();
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
                    className={classes.button}
                    startIcon={<CommentIcon />}>
                    {props.comment} Comment</Button></div>
        </div>)
}