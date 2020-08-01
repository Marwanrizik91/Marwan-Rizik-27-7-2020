

export const routes = {
    inbox: "/inbox",
    deleted: "/deleted",
    login: "/login",
    register: "/register",
    sent: "/sent",
    message: "/message:id"
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
    {
        title: "Deleted",
        redirectLink: routes.deleted
    }
]