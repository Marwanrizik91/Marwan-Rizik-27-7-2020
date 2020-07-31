import { atom } from 'recoil'

export const loggedInState = atom({
    key: 'loggegInState',
    default: document.cookie.indexOf('access_token') !== -1
})