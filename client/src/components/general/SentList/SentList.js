import React from 'react'
import SentListItem from '../SentListItem';
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
        data.map(({ senderEmail, title, content, creationDate, id }) => (
            <SentListItem key={id} email={senderEmail} title={title} content={content} creationDate={creationDate} />
        ))
    )

}