import { sendMsg } from "../data/provider.js"

export const MessagePackager = (sender, recipient, message, readStatus) => {

    if ( recipient === 0 || !message)
    {
        const msgErrorElement = document.getElementById("msgError");
        msgErrorElement.classList.add("visible");
        msgErrorElement.setAttribute("hidden", false);
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



