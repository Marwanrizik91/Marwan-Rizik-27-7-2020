import { routes } from '../constants'
import deleteAllCookies from './deleteCookies'

export default async function apiCall(route, method, body = {}) {

    const response = await fetch(process.env.REACT_APP_API_HOST + route, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: method === 'get'? null : JSON.stringify(body),
        credentials: 'include'

    })

    if (response.status === 403 || response.status === 401) {
        deleteAllCookies()
        window.location = routes.login
    }

    const data = await response.json()

    return data

}

