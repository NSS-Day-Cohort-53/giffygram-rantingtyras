import { getMessages, getUsers, getCurrentUser } from "../data/provider.js"

export const MessageList = () => {
    let messages = getMessages();
    const users = getUsers();
    const currentUser = getCurrentUser();

    messages = messages.filter(message => message.recipientId === currentUser.id);

    return `
        <article>
            ${messages.map(message => {
                return `
                    <section class="message">
                        <p class="message__author">${users.find(user => message.userId === user.id).name}</p>
                        <p>${message.text}</p>
                    </section>`
            }).join("")}
        </article>`
}