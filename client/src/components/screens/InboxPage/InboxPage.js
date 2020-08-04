import React, { useEffect } from 'react'
import InboxList from '../../general/InboxList'
import { useRecoilValue } from 'recoil'
import { useSetMessageData, messageState } from '../../../store/messageData'
import { getReceivedMessages } from '../../../actions/actions'

export default function InboxPage() {

    const messagesData = useRecoilValue(messageState)
    const setMessagesData = useSetMessageData()

    useEffect(() => {
        (async () => {
           const messagesData = await getReceivedMessages()
           setMessagesData(messagesData)
        })()
        return () => setMessagesData([])
    }, [])

    return (
        <InboxList messagesData={messagesData} />
    )
}