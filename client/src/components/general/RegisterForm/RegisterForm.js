import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import apiCall from '../../../util/apiCall'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../constants'

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

    },
    succcessMessage: {
        color: "green",
    },
    errorMessage: {
        color: "red"
    }
}));


export default function RegisterForm() {

    const classes = useStyles();
    const history = useHistory()

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
    }


    const [resMessage, setResMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleOnSubmit = async (e) => {
        e.preventDefault()

            const res = await apiCall('/api/user/signup', 'post', userDetails)
            if (res.message) {
                setResMessage('Account created successfully you will be redirected to login page shortly')
                setTimeout(() => {
                    history.push(routes.login)
                }, 3000);
            } else if (res.error) {
                setErrorMessage(res.error)
            }

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
                <div>Already have an account?</div>
                <Button variant="contained" onClick={() => history.push(routes.login)} color="secondary">click here</Button>
                <span className={classes.succcessMessage}>{resMessage}</span>
                <span className={classes.errorMessage}>{errorMessage}</span>
            </div>
        </form>
    )
}
