import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import { routes } from '../../../constants'
import { useHistory, useLocation } from 'react-router-dom'
import { logout, addMessage, getReceivedMessages, getSentMessages } from '../../../actions/actions'
import ComposeDialog from '../../general/ComposeDialog'
import { navBarData } from '../../../constants'
import Badge from '@material-ui/core/Badge';
import { messageState, useSetMessageData } from '../../../store/messageData'
import { userData } from '../../../store/userData'
import { useRecoilValue } from 'recoil'
import capitalizeFirstLetter from '../../../util/capitalizeFirstLetter'
import Avatar from '@material-ui/core/Avatar';
import capFirstLetter from '../../../util/firstLetterCap'




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    badge: {
        marginLeft: '30px'
    },
    avatar: {
        marginRight: '7px',
        alignSelf: 'center'
    },
}));

export default function MainPageWithLeftDrawer({ children }) {
    const classes = useStyles();

    const loggedUser = useRecoilValue(userData)

    const messageData = useRecoilValue(messageState)
    const setRecoilMessagesData = useSetMessageData()
    const [newMessages, setNewMessages] = useState()
    const currentLocation = useLocation().pathname

    // show new messages on the AppBar

    useEffect(() => {
        if (currentLocation === routes.inbox) {
            const newmsgs = messageData?.data?.filter(msg => msg.isRead === false)
            setNewMessages(newmsgs)
        }
        return
    }, [messageData])
    

    let history = useHistory();

    //Compose dialog state and handle functions
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [error, setError] = React.useState("");


    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    // handles the send button on compose, and updates the lists.
    const handleSend = async (body) => {
        const res = await addMessage(body)
        if (currentLocation === '/') {
            const newMsgsList = await getReceivedMessages()
            setRecoilMessagesData(newMsgsList)
        } else if (currentLocation === '/sent') {
            const newMsgsList = await getSentMessages()
            setRecoilMessagesData(newMsgsList)
        }
        if (res.error) {
            setError(res.error)
            setDialogOpen(true);
        } else {
            setDialogOpen(false)
        }
    }


    const handleLogout = () => {
        logout()
        localStorage.removeItem('user')
        history.push(routes.login)
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Avatar className={classes.avatar}>{`${capFirstLetter(loggedUser.firstName)}${capFirstLetter(loggedUser.lastName)}`}</Avatar>
                    <Typography variant="h6" noWrap>
                        {`Welcome ${capitalizeFirstLetter(loggedUser.firstName)} ${capitalizeFirstLetter(loggedUser.lastName)}`}
                    </Typography>
                    <Badge className={classes.badge} badgeContent={newMessages?.length} color="secondary">
                        <MailIcon />
                    </Badge>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem onClick={handleClickOpen} button key="Compose">
                        <ListItemIcon><CreateIcon /></ListItemIcon>
                        <ListItemText primary="Compose" />
                    </ListItem>
                    {navBarData.map((item, index) => (
                        <ListItem selected={currentLocation === item.redirectLink} button key={item.title} onClick={() => {
                            history.push(item.redirectLink)
                            }}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <ListItem onClick={handleLogout} button key="Logout">
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
                <ComposeDialog open={dialogOpen} handleClose={handleClose} handleSend={handleSend} error={error} />
            </main>
        </div>
    );
}
