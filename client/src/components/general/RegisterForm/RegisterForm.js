import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import apiCall from '../../../util/apiCall'

const useStyles = makeStyles((theme) => ({
    multiTextField: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        justtifyContent: 'center',
        alignItems: 'center'

    }
}));


export default function RegisterForm({onSubmit}) {

    const classes = useStyles();


    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    console.log(userDetails)

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
      }

      const handleOnSubmit = (e) => {
        e.preventDefault()
        apiCall('http://localhost:4000', '/api/user/signup', 'post', userDetails )
    }

    return (
        <form onSubmit={handleOnSubmit} className={classes.multiTextField} noValidate autoComplete="off">
            <div className={classes.inputContainer}>
                <TextField required id="email"
                    label="email"
                    type="email"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <TextField required id="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <TextField required id="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <TextField required id="password"
                    label="password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <TextField required id="confirmPassword"
                    label="confirm password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <Button variant="contained" type="submit" color="secondary">Register</Button>
            </div>
        </form>
    )
}
