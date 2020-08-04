import React from 'react'
import MessagesListItem from '../MessagesListItem';
import LoadingSpinner from '../LoadingSpinner'




export default function SentList({ messagesData: { data = [] } }) {



    if (!data.length) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        data.map(({ senderEmail, title, content, creationDate, id, isRead, senderDeleted }) => (
            <MessagesListItem key={id} id={id} email={senderEmail} title={title} content={content} creationDate={creationDate} isRead={isRead} sentList={true} deleted={senderDeleted} />
        ))
    )

}