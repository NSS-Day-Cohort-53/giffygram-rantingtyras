import {
    getMessages,
    getUsers,
    getCurrentUser,
    setMessageRead,
} from "../data/provider.js";

export const MessageList = () => {
    let messages = getMessages();
    const users = getUsers();
    const currentUser = getCurrentUser();

    // filter messages to get only those sent to currentUser and has not been read yet
    messages = messages.filter(
        (message) => message.recipientId === currentUser.id && !message.read
    );

    // if there are no messages, show to user that there are no messages to view
    if (messages.length === 0) {
        return `
                <article>
                    <section class="message">
                        <p>You have no messages</p>
                    </section>
                </article>
           `;
    } else {
        // change each messages' read state to true and update in database
        messages.forEach((message) =>
            setMessageRead(message)
        );

        return `
            <article>
                ${messages
                    .map((message) => {
                        return `
                        <section class="message">
                            <p class="message__author">${
                                users.find(
                                    (user) => message.userId === user.id
                                ).name
                            }</p>
                            <p>${message.text}</p>
                        </section>`;
                    })
                    .join("")}
            </article>
        `
    }
};
