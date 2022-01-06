import { sendMsg } from "../data/provider.js"

export const MessagePackager = (sender, recipient, message, readStatus) => {
    const messageObj = {
        senderId: sender,
        recipientId: recipient,
        messageText: message,
        readStatus: false
    }

    sendMsg(messageObj);

}

document.addEventListener("click", (event)=>{
    if (event.target.id === "sendMsg")
    {
        
    }
})

