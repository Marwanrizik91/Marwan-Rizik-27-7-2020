import { atom } from 'recoil'

export const userData = atom({
    key: 'userData',
    default: {
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    }
})