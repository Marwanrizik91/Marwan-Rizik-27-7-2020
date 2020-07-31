import { makeStyles } from '@material-ui/core/styles';


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

export const classes = useStyles();