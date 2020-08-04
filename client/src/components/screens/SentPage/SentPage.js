import React, { useEffect } from 'react'
import SentList from '../../general/SentList'
import { useRecoilValue } from 'recoil'
import { useSetMessageData, messageState } from '../../../store/messageData'
import { getSentMessages } from '../../../actions/actions'

export default function SentPage() {

    const messagesData = useRecoilValue(messageState)
    const setMessagesData = useSetMessageData()

    useEffect(() => {
        (async () => {
           const messagesData = await getSentMessages()
           setMessagesData(messagesData)
        })()

        return () => setMessagesData([])
    }, [])

    return (
        <SentList messagesData={messagesData} />
    )
}