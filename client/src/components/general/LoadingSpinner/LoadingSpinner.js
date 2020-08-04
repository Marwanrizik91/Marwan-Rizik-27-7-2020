import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function LoadingSpinner() {


    const classes = useStyles();


    return (
        <div className="spinner__container">

            <div className={classes.root}>
                <CircularProgress  />
            </div>
        </div>

    )
}

