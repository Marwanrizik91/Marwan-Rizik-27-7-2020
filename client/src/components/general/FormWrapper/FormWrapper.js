import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(50),
            height: theme.spacing(60),
        },
        height: '100vh',
        backgroundImage: 'url(/img/formBackground.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
}));

export default function FormWrapper({ children }) {

    const classes = useStyles();


    return (
        <Container fixed className={classes.root}>
            
            <Paper className={classes.paper} elevation={3} >
                {children}
            </Paper>
        </Container>
    )
}