import { sendMsg } from "../data/provider.js"

export const MessagePackager = (sender, recipient, message, readStatus) => {
    const messageObj = {
        userId: sender,
        recipientId: recipient,
        text: message,
        read: false
    }

    sendMsg(messageObj);

}



