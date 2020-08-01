import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    marginTop: '5px',
    backgroundColor: theme.palette.grey[200]
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    marginRight: '7px',
  },
  itemListContainer: {
    display: 'flex',
    justifyContent: 'center',
  }
}));


export default function SentListItem({ email, title, content, creationDate }) {
  

  const classes = useStyles();

  return (
    
    <div className={classes.itemListContainer}>
        
        <ListItem className={classes.root} alignItems="flex-start">
          <Avatar className={classes.avatar}>{`${email[0].toString().toUpperCase()}`}</Avatar>
          <ListItemText
            primary={title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${email}-  `}
                </Typography>
                {`${content.length < 70 ? content : content.slice(0, 70) + '...'}`}
                <br/>
                {creationDate.split('T')[0]}
              </React.Fragment>
            }
          />
        </ListItem>
  
    </div>
  );
}