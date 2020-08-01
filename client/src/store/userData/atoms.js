import { atom } from 'recoil'

const user = JSON.parse(localStorage.getItem('user') ?? '{}')

export const userData = atom({
    key: 'userData',
    default: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
})