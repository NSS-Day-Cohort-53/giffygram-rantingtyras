import { sendMsg } from "../data/provider.js"

export const MessagePackager = (sender, recipient, message, readStatus) => {

    if ( recipient === 0 || !message)
    {
        const msgSentAlertElement = document.getElementById("msgSentAlert");
        msgSentAlertElement.classList.remove("visible");
        msgSentAlertElement.setAttribute("hidden", true);

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

    return sendMsg(messageObj).then(response => response.json())
        .then(()=>{
            const applicationElement = document.querySelector(".giffygram");
            applicationElement.dispatchEvent(new CustomEvent("messageSent"));
        });
    }

}



