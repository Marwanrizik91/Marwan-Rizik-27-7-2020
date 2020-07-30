import { atom } from 'recoil'
import moment from 'moment'

export const messageState = atom({
    key: 'messageState',
    default: [{
        title: "Hello",
        senderId: "1",
        receiverId: "2",
        content: "Test message",
        creationDate: moment(Date.now()).format("YYYY-MM-DD"),
        isRead: false,
        receiverDeleted: false,
        senderDeleted: false
    }]
})