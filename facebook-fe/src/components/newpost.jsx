import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Axios from 'axios';
import swal from 'sweetalert';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(props.open);
    const [content, setContent] = React.useState('');
    const [selectedfile, setSelectedfile] = React.useState(null);


    const savepost = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.post(`http://localhost:5000/addpost`, { id: user.id, content: selectedfile, description: content })
            .then(res => {
                if (res.data.success === true) {
                    swal('your Post is uploaded', 'check your posts', 'success')
                    setOpen(false);
                }
            })
    }
    const fileChangedHandler = event => {
        getBase64(event.target.files[0], (result) => {
            setSelectedfile(result);
        });
    }
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleChangehead = (event) => {
        setContent(event.target.value)
    }

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
      </Button> */}
            <Dialog open={open} onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Say your friends what you are up to
          </DialogContentText>

                    <textarea name="questionhead" cols="50" rows="4" onChange={handleChangehead} placeholder="Enter your Feed"></textarea>
                    <input type="file" onChange={fileChangedHandler} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={savepost} color="primary">
                        Add Post
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
