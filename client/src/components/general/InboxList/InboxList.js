import React from 'react'
import MessagesListItem from '../MessagesListItem';
import LoadingSpinner from '../LoadingSpinner'



export default function InboxList({ messagesData: { data = [] } }) {

    if (!data.length) {
        return (
                <LoadingSpinner />
        )
    }

    return (
        data.map(({ senderEmail, senderFirstName, senderLastName, title, content, creationDate, id, isRead, receiverDeleted }) => (
            <MessagesListItem key={id} id={id} data={data} first={senderFirstName} isRead={isRead} last={senderLastName} email={senderEmail} title={title} content={content} creationDate={creationDate} deleted={receiverDeleted} />
        ))
    )

}