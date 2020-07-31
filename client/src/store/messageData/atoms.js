import { atom } from 'recoil'
import moment from 'moment'

export const messageState = atom({
    key: 'messageState',
    default: [{}]
})