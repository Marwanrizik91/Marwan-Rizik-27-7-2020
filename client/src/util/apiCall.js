

export default async function apiCall(host, route, method, body = {}) {

    const response = await fetch(host + route, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()


    return data

}