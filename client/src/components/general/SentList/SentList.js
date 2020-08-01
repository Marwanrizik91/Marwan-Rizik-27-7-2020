import React from 'react'
import MessagesListItem from '../MessagesListItem';
import Typography from '@material-ui/core/Typography';



export default function SentList({ messagesData: { data = [] } }) {

    if(!data.length) {
        return (
            <Typography
            align='center'
            component="span"
            variant="body2"
            color="textPrimary"
          >You have sent 0 messages</Typography>
        )
    }

    return (
        data.map(({ senderEmail, title, content, creationDate, id, isRead, senderDeleted }) => (
            <MessagesListItem key={id} id={id} email={senderEmail} title={title} content={content} creationDate={creationDate} isRead={isRead} sentList={true} deleted={senderDeleted}/>
        ))
    )

}