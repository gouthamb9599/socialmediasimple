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
    const [bio, setBio] = React.useState('');

    const handlebio = (event) => {
        console.log(event.target.value);
        setBio(event.target.value);
    }

    const savebio = () => {
        const user = JSON.parse(sessionStorage.getItem('userData'));
        Axios.post(`http://localhost:5000/addbio`, { id: user.id, bio: bio })
            .then(res => {
                if (res.data.success === true) {
                    swal('your Information added successfully', 'checkout your profile', 'success')
                }
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
      </Button> */}
            <Dialog open={open} onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">About You</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Describe yourself in 4-5 sentences
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Bio"
                        type="text"
                        onChange={handlebio}
                        fullWidth
                    >                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={savebio} color="primary">
                        Add Bio
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
