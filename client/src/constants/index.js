
export const currentLocation = window.location.pathname


export const routes = {
    inbox: "/",
    login: "/login",
    register: "/register",
    sent: "/sent",
}

export const navBarData = [
    {
        title: "Inbox",
        redirectLink: routes.inbox,
    },
    {
        title: "Sent",
        redirectLink: routes.sent,
    },
]