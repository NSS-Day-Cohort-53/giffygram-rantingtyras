import {
    getMessages,
    getUsers,
    getCurrentUser,
    setMessageRead,
} from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

export const MessageList = () => {
    let messages = getMessages();
    const users = getUsers();
    const currentUser = getCurrentUser();
    let html = ``;

    messages = messages.filter(
        (message) => message.recipientId === currentUser.id && !message.read
    );

    if (messages.length === 0) {
        return `
                <article>
                    <section class="message">
                        <p>You have no messages</p>
                    </section>
                </article>
           `;
    } else {
        const promisesArray = [];
        messages.forEach((message) =>
            promisesArray.push(setMessageRead(message))
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
