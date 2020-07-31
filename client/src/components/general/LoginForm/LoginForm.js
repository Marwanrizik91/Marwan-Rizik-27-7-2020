import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import apiCall from '../../../util/apiCall'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../constants'
import { useRecoilValue } from 'recoil';

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
    registerButton : {
        marginTop: '10px'
    }
}));

export default function RegisterForm() {

    const history = useHistory()
    const classes = useStyles();

    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('')

    const handleOnSubmit = async (e) => {
        e.preventDefault()
         const res = await apiCall('/api/user/login', 'post', userDetails)
         if(res.code === 200 && res.message) {
             history.push(routes.inbox)
         } else if(res.error){
             setError(res.error)
         }
    }

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
      }


    return (
        <form onSubmit={handleOnSubmit}  className={classes.multiTextField} noValidate autoComplete="off">
            <div className={classes.inputContainer}>
                <TextField required id="email"
                    label="email"
                    type="email"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
                <TextField required id="password"
                    label="password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    defaultValue="" />
               
                <Button variant="contained" type="submit" color="secondary">Login</Button>
                <Button variant="contained" className={classes.registerButton} onClick={() => history.push(routes.register)} color="secondary">Register</Button>


                <span>{error}</span>
            </div>
        </form>
    )
}
