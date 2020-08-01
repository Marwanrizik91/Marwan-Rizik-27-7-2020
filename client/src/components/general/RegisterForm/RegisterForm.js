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
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    succcessMessage: {
        color: "green",
    },
    errorMessage: {
        color: "red"
    },
    button: {
        margin: '7px'
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
                    label="Email"
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
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <TextField required id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <Button className={classes.button} variant="contained" type="submit" color="secondary">Register</Button>
                <div>Already have an account?</div>
                <Button  onClick={() => history.push(routes.login)} >click here</Button>
                <span className={classes.succcessMessage}>{resMessage}</span>
                <span className={classes.errorMessage}>{errorMessage}</span>
            </div>
        </form>
    )
}
