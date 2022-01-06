import { sendMsg } from "../data/provider.js"

export const MessagePackager = (sender, recipient, message, readStatus) => {

    if ( recipient.length < 1 || message.length < 1)
    {
        window.alert("Please fill in all message fields")
    }
    else
    {
    
    const messageObj = {
        userId: sender,
        recipientId: recipient,
        text: message,
        read: false
    }

    sendMsg(messageObj);
    }

}



