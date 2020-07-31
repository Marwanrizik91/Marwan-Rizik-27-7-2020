
import apiCall from '../util/apiCall'

export function addUser(body) {
    return apiCall('/api/user/signup', 'post', body )
}

export function login(body) {
    return apiCall('/api/user/login', 'post', body )
}

export function logout() {
    return apiCall('/api/user/logout', 'delete')
}

export function addMessage(body) {
    return apiCall('/api/messages', 'post', body)
}

export function getSentMessages() {
    return apiCall('/api/messages/sent', 'get')
}

export function getReceivedMessages() {
    return apiCall('/api/messages/received', 'get')
}

export function getMessageById(messageId) {
    return apiCall(`/api/message/${messageId}`, 'get')
}

export function deleteMessage(messageId) {
    return apiCall(`/api/message/delete/${messageId}`, 'post')
}

export function markMessageAsRead(messageId) {
    return apiCall(`/api/message/read/${messageId}`, 'post')
}