import { atom } from 'recoil'
import moment from 'moment'

export const messageData = atom({
    key: 'messageData',
    default: {
        title: "",
        senderId: "",
        receiverId: "",
        content: "",
        creationDate: moment(Date.now()).format("YYYY-MM-DD"),
        isRead: false,
        receiverDeleted: false,
        senderDeleted: false
    }
})