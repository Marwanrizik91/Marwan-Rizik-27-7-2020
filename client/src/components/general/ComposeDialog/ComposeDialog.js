import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom'
const useStyles = makeStyles({
    error: {
        color: 'red',
        alignSelf: 'center'
    }, 

});


export default function FormDialog({ open, handleClose, handleSend, senderEmail, error, receiverEmail }) {


    const classes = useStyles()

    const [messageBody, setMessageBody] = useState({
        email: senderEmail || receiverEmail || '',
        title: '',
        content: ''
    })

    const currentLocation = useLocation().pathname

    const handleChange = (e) => {
        setMessageBody({ ...messageBody, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Send a message</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Recepient Email Address"
                        type="email"
                        value={currentLocation === '/sent'? receiverEmail : currentLocation === '/'? senderEmail : null}
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel</Button>
                    <Button onClick={() => { handleSend(messageBody) }} color="primary">
                        Send</Button>
                </DialogActions>
                        
                    <Typography component="span"
                        variant="body2"
                        className={classes.error}
                        color="textPrimary">{error}</Typography>
            </Dialog>
        </div>
    );
}